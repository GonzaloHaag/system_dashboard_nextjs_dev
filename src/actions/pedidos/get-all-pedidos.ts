'use server';
import prisma from '@/lib/prisma';
export const getAllPedidos = async (userId: number, searchQuery: string) => {
    try {
        const pedidos = searchQuery === '' ? await prisma.pedido.findMany({
            where: {
                usuarioId: userId
            },
            include: {
                Cliente: {
                    select: {
                        id: true,
                        nombre: true,
                        direccion:true,
                        ciudad:true
                    }
                },
                productos: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                id: true,
                                titulo: true,
                                precio: true
                            }
                        }
                    },
                }
            },
            orderBy : {
                id:'desc'
            }
        }) : await prisma.pedido.findMany({
            where: {
                usuarioId: userId,
                Cliente : {
                    nombre : {
                        contains:searchQuery,
                        mode:'insensitive'
                    }
                }
            },
            include: {
                Cliente: {
                    select: {
                        id: true,
                        nombre: true,
                        direccion:true,
                        ciudad:true
                    }
                },
                productos: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                id: true,
                                titulo: true,
                                precio: true
                            }
                        }
                    },
                }
            },
            orderBy : {
                id:'asc'
            }
        })

        return {
            ok: true,
            message: 'Pedidos encontrados',
            pedidos
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al buscar pedidos'
        }
    }
}