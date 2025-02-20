import { getFieldsPedidos } from "@/actions";
import { auth } from "@/auth.config";
import { FormAddPedido } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata:Metadata = {
    title:'Nuevo pedido'
}

export default async function NuevoPedidoModalPage() {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    const respuesta = await getFieldsPedidos( userId );
    if(!respuesta.ok || !respuesta.clientes || !respuesta.productos) {
        return;
    }
    const { clientes,productos } = respuesta;
    return (
        <Dialog open={true}>
            <DialogContent className="w-full sm:min-w-[620px]">
                <DialogHeader>
                    <DialogTitle>Nuevo pedido</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormAddPedido userId={ userId } clientes={ clientes } productos={ productos } />
            </DialogContent>
        </Dialog>
    );
}