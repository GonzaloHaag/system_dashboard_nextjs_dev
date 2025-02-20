'use server';

import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import prisma from "@/lib/prisma";


export const getDataAllDashboard = async (userId: number) => {
    try {
        const [totalCountClientsActive, totalGanancias, totalCountProducts, totalSalesPrice, ventasPorMes, gananciasPorMes] = await Promise.all([
            prisma.cliente.count({
                where: {
                    usuarioId: userId,
                    status: 'Activo'
                }
            }),
            prisma.venta.aggregate({
                where: {
                    usuarioId: userId,
                },
                _sum: {
                    ganancias: true
                }
            }),

            prisma.product.count({
                where: {
                    usuarioId: userId
                }
            }),
            prisma.venta.aggregate({
                where : {
                    usuarioId:userId
                },
                _sum : {
                    precioTotal:true
                }
            }),
            prisma.venta.groupBy({
                by: ['fecha'],
                where: {
                    usuarioId: userId,
                },
                _sum: {
                    precioTotal:true // Sumo precio total de ventas
                },
                orderBy: {
                    fecha: 'asc',
                },
            }),
            prisma.venta.groupBy({
                by: ['fecha'],
                where: {
                    usuarioId: userId,
                },
                _sum: {
                    ganancias: true, // Numero de ganancias por mes
                },
                orderBy: {
                    fecha: 'asc',
                },
            }),
        ]);


        // Agrupar por mes y contar las ventas
        const ventasAgrupadasPorMes = ventasPorMes.reduce((acc, venta) => {
            const mes = venta.fecha.toLocaleString('default', { month: 'short' });
            if (!acc[mes]) {
                acc[mes] = 0;
            }
            acc[mes] += venta._sum.precioTotal || 0; // Sumar precio total de ventas
            return acc;
        }, {} as Record<string, number>);

        // Convertir el objeto a un array de objetos con el formato que espera el gráfico
        const data = Object.keys(ventasAgrupadasPorMes).map((mes) => ({
            name: capitalizeFirstLetter(mes),
            ventas: ventasAgrupadasPorMes[mes], // Número de ventas
        }));

        // Agrupar por mes y contar las ventas
        const gananciasAgrupadasPorMes = gananciasPorMes.reduce((acc, ganancia) => {
            const mes = ganancia.fecha.toLocaleString('default', { month: 'short' });
            if (!acc[mes]) {
                acc[mes] = 0;
            }
            acc[mes] += ganancia._sum.ganancias || 0; // Sumar el número de ganancias
            return acc;
        }, {} as Record<string, number>);

        // Convertir el objeto a un array de objetos con el formato que espera el gráfico
        const dataGananciasPorMes = Object.keys(gananciasAgrupadasPorMes).map((mes) => ({
            name: capitalizeFirstLetter(mes),
            Ganancias: gananciasAgrupadasPorMes[mes], // Número de ventas
        }));

        return {
            ok: true,
            message: 'Data dashboard obtenida!',
            totalCountClientsActive,
            totalGanancias: totalGanancias._sum.ganancias,
            totalCountProducts,
            totalSalesPrice:totalSalesPrice._sum.precioTotal,
            data,
            dataGananciasPorMes
        }


    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener la data del dashboard'
        }
    }
}