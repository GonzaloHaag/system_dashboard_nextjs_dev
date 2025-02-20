'use server';
// ... existing imports and functions

import type { StatusPedido } from "@/interfaces"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ... other functions

export async function updatePedidoStatus(pedidoId: number, newStatus: StatusPedido) {
    try {
        await prisma.pedido.update({
            where: {
                id: pedidoId,
            },
            data: {
                status: newStatus,
            },
        });

        revalidatePath('/pedidos');

        return {
            ok: true,
            message: 'Pedido actualizado correctamente!',
            // pedido: updatedPedido 
        }
    } catch (error) {
        console.error("Error updating pedido status:", error)
        return {
            ok: false, message: "Error al actualizar el estado del pedido"
        }
    }
}
