'use server';

import prisma from "@/lib/prisma";

export const getAllCategories = async (userId: number, searchQuery: string,page=1,take=20) => {
    if(isNaN(Number(page))) page=1;
    if(page<1) page = 1;
    try {
        const categorias = searchQuery === '' ? await prisma.category.findMany({
            where: {
                usuarioId: userId
            },
            select: {
                id: true,
                nombre: true,
                createdAt: true
            },
            orderBy : {
                id:'asc'
            },
            take : take,
            skip: (page -1 ) * take
        }) : await prisma.category.findMany({
            where: {
                usuarioId: userId,
                nombre: {
                    contains: searchQuery,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                nombre: true,
                createdAt: true
            }
        });


        const totalCount = await prisma.category.count({
            where : {
                usuarioId : userId
            }
        });

        const totalPages = Math.ceil( totalCount / take );

        return {
            ok: true,
            message: 'Categorias obtenidas',
            totalPages,
            categorias
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener las categorías'
        }
    }
};

export const getCategoriesProductAdd = async(userId:number) => {
    try {
        
        const categories = await prisma.category.findMany({
            where : {
                usuarioId : userId
            },
            orderBy : {
                 nombre:'asc'
            },
            select : {
                id:true,
                nombre:true
            }
        });

        return {
            ok:true,
            message:'Categorías encontradas',
            categories
        }
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener categorías'
        }
    }
}