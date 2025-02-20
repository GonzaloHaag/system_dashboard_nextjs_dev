'use client';
import { deleteVentaWithId } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
export const ButtonDeleteVenta = ({ ventaId }: { ventaId: number }) => {
    const clickDeleteVenta = async () => {
        const respuesta = await deleteVentaWithId(ventaId);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        toast.warning(respuesta.message);
    }
    return (
        <button type="button" title="Borrar" onClick={clickDeleteVenta}>
            <Trash2Icon className="text-red-600" />
        </button>
    )
}
