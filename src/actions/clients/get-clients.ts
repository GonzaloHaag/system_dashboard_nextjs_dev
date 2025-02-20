'use server';

import prisma from "@/lib/prisma";


export const getAllClients = async(userId:number,searchQuery:string,page=1,take=20) => {

    if(isNaN(Number(page))) page=1;
    if(page<1) page = 1;
    try {
        const clients = searchQuery === '' ? await prisma.cliente.findMany({
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
            take : take,
            skip: (page -1 ) * take
        }) : await prisma.cliente.findMany({
            where : {
                usuarioId : userId,
                nombre : {
                    contains : searchQuery,
                    mode:'insensitive'
                }
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
            }
        });

        const totalCount = await prisma.cliente.count({
            where : {
                usuarioId : userId
            }
        });

        const totalPages = Math.ceil(totalCount / take );

        return {
            ok:true,
            message:'Clientes obtenidos',
            totalPages,
            clients
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los clientes'
        }
    }
}