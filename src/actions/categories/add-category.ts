'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addCategory = async (userId: number, nombre: string) => {
    try {
        await prisma.category.create({
            data: {
                usuarioId: userId,
                nombre: nombre
            }
        })

        revalidatePath('/categorias');
        return {
            ok: true,
            message: 'Categoría creada!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al agregar la categoría'
        }
    }
}

