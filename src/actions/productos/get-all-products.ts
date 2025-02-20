'use server';

import prisma from "@/lib/prisma";

export const getAllProducts = async (userId: number, searchQuery: string,page=1,take=20) => {

    if(isNaN(Number(page))) page=1;
    if(page<1) page = 1;
    try {
        const products = searchQuery === '' ? await prisma.product.findMany({
            where: {
                usuarioId: userId
            },
            select: {
                id: true,
                titulo: true,
                costo:true,
                precio: true,
                stock: true,
                color:true,
                Category: {
                    select: {
                        nombre: true
                    }
                }
            },
            orderBy : {
                titulo:'asc'
            },
            take:take,
            skip: (page -1 ) * take
        }) : await prisma.product.findMany({
            where: {
                usuarioId: userId,
                OR: [
                    {
                        titulo: {
                            contains: searchQuery,
                            mode: 'insensitive'
                        }
                    },
                    {
                        Category: {
                            nombre: {
                                contains: searchQuery,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]

            },
            select: {
                id: true,
                titulo: true,
                precio: true,
                costo:true,
                stock: true,
                color:true,
                Category: {
                    select: {
                        nombre: true
                    }
                }
            },
            orderBy : {
                titulo:'asc'
            }

        });

        const totalCount = await prisma.product.count({
            where : {
                usuarioId : userId
            }
        });
        const totalPages = Math.ceil(totalCount / take );
        return {
            ok:true,
            message:'Productos encontrados',
            totalPages,
            products
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener los productos'
        }
    }
}