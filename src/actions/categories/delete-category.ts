'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategoryWithId = async (categoryId: number) => {
    try {

        const relatedProducts = await prisma.product.findMany({
            where : {
                categoryId : categoryId
            }
        });

        if(relatedProducts.length > 0) {
            return {
                ok:false,
                message:'La categoría no se puede eliminar porque tiene productos asociados.'
            }
        }
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        revalidatePath('/categorias');

        return {
            ok: true,
            message: 'Categoria eliminada!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Categoria eliminada!'
        }
    }
}