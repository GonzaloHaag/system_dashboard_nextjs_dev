'use server';

import prisma from "@/lib/prisma";

export const findClientWithId = async (clientId: number) => {
    try {

        const client = await prisma.cliente.findUnique({
            where: {
                id: clientId
            },
            select: {
                id: true,
                nombre: true,
                direccion: true,
                ciudad: true,
                status: true
            }
        });

        return {
            ok: true,
            message: 'Cliente obtenido',
            client
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener el cliente'
        }
    }
}