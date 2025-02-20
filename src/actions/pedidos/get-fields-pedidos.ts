'use server';

import prisma from "@/lib/prisma";


export const getFieldsPedidos = async(userId:number) => {
     try {

        const clientes =  await prisma.cliente.findMany({
            where : {
                usuarioId : userId
            },
            select : {
                id:true,
                nombre:true,
            },
            orderBy : {
                nombre : 'asc'
            }
        });
        const productos = await prisma.product.findMany({
            where : {
                usuarioId : userId
            },
            select : {
                id:true,
                titulo:true,
                stock:true,
                color:true,
                precio:true
            },
            orderBy : {
                titulo:'asc'
            }
        });

        return {
            ok:true,
            message:'Campos de los pedidos obtenidos',
            clientes,
            productos
        }
        
     } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los campos de los pedidos'
        }
     }
}