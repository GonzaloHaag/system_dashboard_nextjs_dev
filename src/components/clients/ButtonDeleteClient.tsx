'use client';
import { deleteClientWithId } from "@/actions";
import {  Trash2Icon } from "lucide-react";
import { toast } from "sonner";
export const ButtonDeleteClient = ({ clientId } : { clientId:number }) => {

    const clickDeleteClient = async() => {
        const respuesta = await deleteClientWithId( clientId );
        if(!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        toast.warning(respuesta.message);
    }
    return (
        <button type="button" title="Borrar" onClick={clickDeleteClient}>
            <Trash2Icon className="text-red-600" />
        </button>
    )
}
