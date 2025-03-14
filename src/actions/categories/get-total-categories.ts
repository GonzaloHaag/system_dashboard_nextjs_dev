'use server';

import prisma from "@/lib/prisma";

export const getTotalCategories = async(userId:number) => {
    try {

        const categories = await prisma.category.findMany({
             where : {
                usuarioId : userId
             },
             select: {
                id: true,
                nombre: true,
                createdAt: true
            },
            orderBy : {
                id:'asc'
            }
        });

        return {
            ok:true,
            message:'Éxito al obtener categorías',
            categories
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener las categorías'
        }
    }
}