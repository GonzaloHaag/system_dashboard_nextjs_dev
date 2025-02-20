'use client';
import { deletePedidoWithId } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
export const ButtonDeletePedido = ({ pedidoId }: { pedidoId: number }) => {

    const clickDeletePedido = async () => {
        const respuesta = await deletePedidoWithId(pedidoId);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        toast.warning(respuesta.message);
    }
    return (
        <button type="button" title="Borrar" onClick={clickDeletePedido}>
            <Trash2Icon size={20} className="text-red-600 outline-none" />
        </button>
    )
}
