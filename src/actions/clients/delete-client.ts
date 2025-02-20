'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteClientWithId = async (clientId: number) => {
    try {

        // Verificar que no este en un pedido
        const relatedPedido = await prisma.pedido.findMany({
            where: {
                clienteId: clientId
            }
        });

        // Verificar que no este en una venta 
        const relatedVentas = await prisma.venta.findMany({
            where : {
                clienteId:clientId
            }
        });

        if (relatedPedido.length > 0) {
            return {
                ok: false,
                message: 'El cliente no se puede eliminar porque se encuentra en un pedido'
            }
        }
        if(relatedVentas.length > 0) {
            return {
                ok:false,
                message:'El cliente no se puede eliminar porque se encuentra en una venta'
            }
        }

        await prisma.cliente.delete({
            where: {
                id: clientId
            }
        });

        revalidatePath('/clientes');
        return {
            ok: true,
            message: 'Cliente eliminado!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al eliminar el cliente'
        }
    }
}