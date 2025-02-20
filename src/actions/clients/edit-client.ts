'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const editClientWithId = async (clientId: number, userId: number, nombre: string, ciudad: string, direccion: string | undefined, status: 'Activo' | 'Inactivo') => {
    try {
        await prisma.cliente.update({
            where: {
                id: clientId
            },
            data: {
                usuarioId: userId,
                nombre: nombre,
                ciudad: ciudad,
                direccion: direccion,
                status: status
            }
        });
        revalidatePath('/clientes');
        return {
            ok: true,
            message: 'Cliente editado!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al editar el cliente'
        }
    }
}