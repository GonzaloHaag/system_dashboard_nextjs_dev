'use server';

import prisma from "@/lib/prisma";

export const findCategoryWithId = async(categoryId:number) => {
    try {

        const categoria = await prisma.category.findUnique({
            where : {
                id:categoryId
            },
            select : {
                usuarioId:true,
                id:true,
                nombre:true,
            }
        });

        return {
            ok:true,
            message:'Categoria buscada correctamente',
            categoria
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al buscar la categoría'
        }
    }
}