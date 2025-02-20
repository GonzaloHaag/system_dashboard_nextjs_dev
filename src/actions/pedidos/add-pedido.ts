'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createVentaWithPedidoId } from "../ventas/create-venta-with-pedidoid";


interface AddPedidoProps {
    userId: number;
    clienteId: number;
    ordersItems: { productId: number, quantity: number }[];
    estado: 'pending' | 'inProgress' | 'completed';
    fechaEntrega: string;
    nota: string;
    metodoPago: 'TarjetaCredito' | 'TarjetaDebito' | 'MercadoPago' | 'Efectivo' | 'Transferencia';
    descuento: number;
}

export const addPedido = async ({ userId, clienteId, ordersItems, estado, fechaEntrega, nota, metodoPago, descuento }: AddPedidoProps) => {
    try {

        const productsIds = ordersItems.map((orderItem) => orderItem.productId);
        // Verificamos que existan en la DB
        const productsDB = await prisma.product.findMany({
            where: {
                id: {
                    in: productsIds
                }
            },
            select: {
                id: true,
                precio: true,
                stock: true
            }
        });
        const stockErrors = ordersItems.some(orderItem => {
            const product = productsDB.find(p => p.id === orderItem.productId);
            return !product || product.stock < orderItem.quantity;
        });

        if (stockErrors) {
            return {
                ok: false,
                message: 'Uno o más productos no tienen suficiente stock.'
            }
        }
        if (productsDB.length !== productsIds.length) {
            throw new Error("Uno o más productos seleccionados no existen.");
        }

        const totalPriceOrder = ordersItems.reduce((total, item) => {
            const product = productsDB.find((p) => p.id === item.productId);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            return total + (product.precio * item.quantity);
        }, 0);
        // Calcular el descuento
        if(parseInt(descuento.toString()) && parseInt(descuento.toString()) > 100) {
            return {
                ok:false,
                message:'El descuento no puede ser mayor 100%'
            }
        }
        const discountAmount = (totalPriceOrder * descuento) / 100;
        const totalPriceWithDiscount = totalPriceOrder - discountAmount;
        const totalProducts = ordersItems.reduce((sum, item) => sum + item.quantity, 0);

        const newPedido = await prisma.pedido.create({
            data: {
                usuarioId: userId,
                clienteId: clienteId,
                //Productos hace referencia a la relacion de productosEnPedido
                productos: {
                    create: ordersItems.map((orderItem) => ({
                        productId: orderItem.productId,
                        cantidad: orderItem.quantity
                    }))
                },
                status: estado,
                fechaEntrega: new Date(fechaEntrega),
                nota: nota,
                metodoPago: metodoPago,
                totalPrice: totalPriceWithDiscount,
                descuento:parseInt(descuento.toString()),
                totalProducts: totalProducts

            }
        });

      
        if (newPedido.status === 'completed') {
            await createVentaWithPedidoId(newPedido.id);
        }
        revalidatePath('/pedidos');
        revalidatePath('/productos'); //Por el stock

        return {
            ok: true,
            message: 'Pedido creado correctamente'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Ocurrió un error al crear el pedido'
        }
    }
}