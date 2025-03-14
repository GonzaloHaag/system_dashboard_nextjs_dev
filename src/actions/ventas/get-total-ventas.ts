'use server';

import prisma from "@/lib/prisma";

export const getTotalVentas = async(userId:number) => {
    try {

        const ventas = await prisma.venta.findMany({
            where : {
                usuarioId : userId
            },
            include: {
                Cliente: {
                    select: {
                        nombre: true
                    }
                },
                ProductosEnVenta: {
                    select: {
                        id: true,
                        cantidad: true,
                        product: {
                            select: {
                                precio: true,
                                costo: true,
                                titulo: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'asc'
            },
        });

        return {
            ok:true,
            message:'Éxito al obtener las ventas',
            ventas
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener ventas'

        }
    }
}