'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const editProductWithId = async (userId: number, productId: number, titulo: string, costo:number,precio: number,stock: number, color: string,categoryId: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            return {
                ok: false,
                message: 'El producto no existe'
            }
        }
        if(parseFloat(costo.toString()) > parseFloat(precio.toString())) {
            return {
                ok:false,
                message:'El costo no puede ser mayor al precio'
            }
        }
        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                usuarioId: userId,
                titulo: titulo,
                costo:parseFloat(costo.toString()),
                precio: parseFloat(precio.toString()),
                stock: parseInt(stock.toString()),
                color: color,
                categoryId: categoryId
            }
        });

        revalidatePath('/productos');
        return {
            ok: true,
            message: 'Producto editado correctamente!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al editar el producto'
        }
    }
}