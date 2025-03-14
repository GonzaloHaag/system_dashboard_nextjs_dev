'use server';
import prisma from "@/lib/prisma"

export const getTotalClients = async(userId:number) => {
    try {
        const clientes = await prisma.cliente.findMany({
            where : {
                usuarioId : userId
            },
            select : {
                id:true,
                nombre:true,
                ciudad:true,
                createdAt:true,
                status:true,
            },
            orderBy : {
                id:'asc'
            },
        });

        return {
            ok:true,
            message:'Clientes obtenidos correctamente!',
            clientes
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los clientes'
        }
    }
}