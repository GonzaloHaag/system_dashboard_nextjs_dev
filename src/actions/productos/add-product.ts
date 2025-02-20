'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const addProduct = async(userId:number,titulo:string,costo:number,precio:number,stock:number,color:string,categoryId:number) => {
    try {
        if(parseFloat(costo.toString()) > parseFloat(precio.toString())) {
            return {
                ok:false,
                message:'El costo no puede ser mayor al precio'
            }
        }
        await prisma.product.create({
            data : {
                usuarioId:userId,
                titulo:titulo,
                costo:parseFloat(costo.toString()),
                precio:parseFloat(precio.toString()),
                stock:parseInt(stock.toString()),
                color:color,
                categoryId:categoryId
            }
        });
        revalidatePath('/productos');
        return {
            ok:true,
            message:'Producto creado correctamente!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al crear el producto'
        }
    }
}