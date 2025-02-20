'use server';

import prisma from "@/lib/prisma";

export const findProductWithId = async(productId:number) => {
    try {
        const product = await prisma.product.findUnique({
            where : {
                id:productId
            },
            select : {
                id: true,
                titulo: true,
                precio: true,
                costo:true,
                stock: true,
                color:true,
                Category: {
                    select: {
                        id:true,
                        nombre: true
                    }
                }
            }
        });

        return {
            ok:true,
            message:'Exito al encontrar producto',
            product
        }
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener el producto'
        }
    }
}