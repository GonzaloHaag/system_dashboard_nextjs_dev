'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePedidoWithId = async (pedidoId: number) => {
    try {

        const pedido = await prisma.pedido.findUnique({
            where: {
                id: pedidoId
            }
        });
        if (!pedido) {
            return {
                ok: false,
                message: 'El pedido no existe'
            }
        }
        await prisma.$transaction([
            prisma.productosEnPedido.deleteMany({
                where: { pedidoId : pedidoId }
            }),
            prisma.pedido.delete({
                where: { id: pedidoId }
            })
        ]);

        revalidatePath('/pedidos');
        return {
            ok: true,
            message: 'Pedido eliminado!'
        }
    } catch (error) {

        console.log(error);
        return {
            ok: false,
            message: 'Ocurrió un error al eliminar el pedido'
        }

    }
}