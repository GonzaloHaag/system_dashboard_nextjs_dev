'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addClient = async(userId:number,nombre:string,ciudad:string,direccion:string | undefined,status:'Activo' | 'Inactivo') => {
    try {
        await prisma.cliente.create({
            data : {
                usuarioId:userId,
                nombre:nombre,
                ciudad:ciudad,
                direccion:direccion,
                status:status
            }
        });
        revalidatePath('/clientes');
        return {
            ok:true,
            message:'Cliente creado!'
        }        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al crear el cliente'
        }
    }
}