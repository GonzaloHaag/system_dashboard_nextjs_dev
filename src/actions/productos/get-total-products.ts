'use server';

import prisma from "@/lib/prisma";

export const getTotalProducts = async(userId:number) => {
    try {

        const products = await prisma.product.findMany({
            where : {
                usuarioId : userId
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
        });

        return {
            ok:true,
            message:'Éxito al obtener los productos',
            products
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los productos'
        }
    }
}