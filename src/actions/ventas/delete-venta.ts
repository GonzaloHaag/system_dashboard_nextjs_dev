'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const deleteVentaWithId = async (ventaId: number) => {
    try {
        const findVenta = await prisma.venta.findUnique({
            where: {
                id: ventaId
            }
        });
        if (!findVenta) {
            return {
                ok: false,
                message: 'Venta no encontrada'
            }
        }

        await prisma.$transaction([
            prisma.productosEnVenta.deleteMany({
                where: {
                    ventaId: ventaId
                }
            }),
            prisma.venta.delete({
                where: {
                    id: ventaId
                }
            })
        ])
        revalidatePath('/ventas');
        return {
            ok: true,
            message: 'Venta eliminada correctamente'
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al eliminar la venta'
        }
    }
}