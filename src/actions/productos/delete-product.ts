'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const deleteProductWithId = async (productId: number) => {
    try {
        // Verificar que no este en pedido
        const relatedPedido = await prisma.productosEnPedido.findMany({
            where: {
                productId: productId
            }
        });

        // Verificar que no este en una venta
        const relatedVenta = await prisma.productosEnVenta.findMany({
            where : {
                productId : productId
            }
        });

        if (relatedPedido.length > 0) {
            return {
                ok: false,
                message: 'El producto no se puedo eliminar porque se encuentra en un pedido'
            }
        }

        if(relatedVenta.length > 0) {
            return {
                ok:false,
                message:'El producto no se puede eliminar porque se encuentra en una venta'
            }
        }
        await prisma.product.delete({
            where: {
                id: productId
            }
        });
        revalidatePath('/productos');
        return {
            ok: true,
            message: 'Producto eliminado correctamente!'
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al eliminar el producto'
        }
    }
}