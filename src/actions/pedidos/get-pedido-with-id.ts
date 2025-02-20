'use server';

import prisma from "@/lib/prisma";


export const getPedidoWithId = async (pedidoId: number) => {
    try {

        const pedido = await prisma.pedido.findUnique({
            where: {
                id: pedidoId
            },
            include: {
                Cliente: {
                    select: {
                        id: true,
                        nombre: true,
                        direccion: true,
                        ciudad: true
                    },
                },
                productos: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                id: true,
                                titulo: true,
                                precio: true,
                                color:true,
                                costo:true,
                                stock:true
                            }
                        }
                    },
                }
            },
        });

        return {
            ok: true,
            message: 'Pedido encontrado!',
            pedido
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al encontrar el pedido'
        }
    }
}