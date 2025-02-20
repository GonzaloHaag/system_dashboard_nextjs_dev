'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// La idea es recibir el pedidoId y buscarlo, luego crear la venta con esos datos, sin relacion
export const createVentaWithPedidoId = async (pedidoId: number) => {
    try {
        const findPedidoWithId = await prisma.pedido.findUnique({
            where: {
                id: pedidoId
            },
            include: {
                productos: {
                    include: {
                        product: true
                    }
                }
            }

        });
        if (!findPedidoWithId) {
            return {
                ok: false,
                message: 'Pedido no encontrado'
            }
        }
        // Buscamos que no este en la tabla ventas 
        const findVenta = await prisma.venta.findUnique({
            where: {
                id: pedidoId
            }
        });
        if (findVenta) {
            return {
                ok: false,
                message: 'La venta ya existe'
            }
        };
        const productsIds = findPedidoWithId.productos.map((orderItem) => orderItem.productId);
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
                stock: true,
                costo: true
            }
        });



        const totalGanancias = findPedidoWithId.productos.reduce((total, item) => {
            const product = productsDB.find(p => p.id === item.productId);
            if (!product) throw new Error("Producto no encontrado");
            return total + ((product.precio - product.costo) * item.cantidad);
        }, 0);
        const discountAmount = (totalGanancias * findPedidoWithId.descuento) / 100;
        const gananciasWithDiscount = totalGanancias - discountAmount;

        await prisma.venta.create({
            data: {
                id: findPedidoWithId.id,
                usuarioId: findPedidoWithId.usuarioId,
                clienteId: findPedidoWithId.clienteId,
                //Productos hace referencia a la relacion de productosEnVenta
                ProductosEnVenta: {
                    create: findPedidoWithId.productos.map((orderItem) => ({
                        productId: orderItem.productId,
                        cantidad: orderItem.cantidad
                    }))
                },
                fecha: new Date(findPedidoWithId.fechaEntrega),
                metodoPago: findPedidoWithId.metodoPago,
                precioTotal: findPedidoWithId.totalPrice,
                descuento: findPedidoWithId.descuento,
                ganancias: gananciasWithDiscount
            }
        });
        // Descontar stock
        await Promise.all(
            findPedidoWithId.productos.map((orderItem) => prisma.product.update({
                where: {
                    id: orderItem.productId
                },
                data: {
                    stock: {
                        decrement: orderItem.cantidad
                    }
                }
            }))
        );
        revalidatePath('/pedidos');
        revalidatePath('/ventas');
        revalidatePath('/dashboard');
        return {
            ok: true,
            message: 'Venta registrada correctamente!',
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al crear la venta'
        }
    }
}