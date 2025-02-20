'use server';

import prisma from "@/lib/prisma";

export const getFiltersProducts = async(userId:number) => {
    try {

        const categories = await prisma.category.findMany({
            where : {
                usuarioId : userId
            }
        });

        return {
            ok:true,
            message:'Filtros obtenidos',
            categories
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los filtros'
        }
    }
}