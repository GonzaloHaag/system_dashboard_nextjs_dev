'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const editCategoryWithId = async(userId:number,categoryId:number,nombre:string) => {
    try {
        await prisma.category.update({
            where : {
                id:categoryId
            },
            data : {
                usuarioId:userId,
                nombre:nombre,
            }
        });

        revalidatePath('/categorias');

        return {
            ok:true,
            message:'Categoría editada correctamente!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al editar categoria'
        }
    }
}