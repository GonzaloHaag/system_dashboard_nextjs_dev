import { getAllPedidos } from "@/actions";
import { toast } from "sonner";
import { PedidosPageContainer } from "./PedidosPageContainer";

export async function PedidosFetcher({ userId,searchQuery }: { userId: number,searchQuery:string }) {
    const respuesta = await getAllPedidos(userId,searchQuery);
    if (!respuesta.ok || !respuesta.pedidos) {
        toast.error(respuesta.message);
        return;
    }
    const { pedidos } = respuesta;
    return <PedidosPageContainer initialPedidos={pedidos} />
}