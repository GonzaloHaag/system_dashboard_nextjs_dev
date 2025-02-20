import { getFieldsPedidos, getPedidoWithId } from "@/actions";
import { auth } from "@/auth.config";
import { FormEditPedido } from "@/components";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
    title: 'Editar pedido'
}

export default async function EditarPedidoPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    const pedidoId = (await params).id;

    const responsePedido = await getPedidoWithId(parseInt(pedidoId));
    if (!responsePedido.ok) {
        toast.error(responsePedido.message)
        return;
    }
    if (!responsePedido.pedido) {
        notFound();
    }
    const respuesta = await getFieldsPedidos(userId);
    if (!respuesta.ok || !respuesta.clientes || !respuesta.productos) {
        return;
    }
    const { clientes, productos } = respuesta;

    const { pedido } = responsePedido;
    return (
        <Dialog open={true}>
            <DialogContent className="w-full sm:min-w-[620px]">
                <DialogHeader>
                    <DialogTitle>Editar pedido</DialogTitle>
                    <DialogDescription>
                        Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>
                <FormEditPedido clientes={clientes} productos={productos} pedidoExistente={pedido} />
            </DialogContent>
        </Dialog>
    );
}