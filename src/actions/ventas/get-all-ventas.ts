'use server';

import prisma from "@/lib/prisma";

export const getAllVentas = async (userId: number, searchQuery: string, page = 1, take = 20) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    try {
        const ventas = searchQuery === '' ? await prisma.venta.findMany({
            where: {
                usuarioId: userId
            },
            include: {
                Cliente: {
                    select: {
                        nombre: true
                    }
                },
                ProductosEnVenta: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                precio: true,
                                costo: true,
                                titulo: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'asc'
            },
            take: take,
            skip: (page - 1) * take
        }) : await prisma.venta.findMany({
            where: {
                usuarioId: userId,
                Cliente: {
                    nombre: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                Cliente: {
                    select: {
                        nombre: true
                    }
                },
                ProductosEnVenta: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                precio: true,
                                costo: true,
                                titulo: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'asc'
            },

        });

        const totalCount = await prisma.venta.count({
            where: {
                usuarioId: userId
            }
        });
        const totalPriceVentas = await prisma.venta.aggregate({
            where : {
                usuarioId:userId
            },
            _sum : {
                precioTotal:true
            }
        });
        const totalPages = Math.ceil(totalCount / take);
        return {
            ok: true,
            message: 'Ventas encontradas',
            totalPages,
            ventas,
            totalPriceVentas : totalPriceVentas._sum.precioTotal
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener las ventas'
        }
    }
}