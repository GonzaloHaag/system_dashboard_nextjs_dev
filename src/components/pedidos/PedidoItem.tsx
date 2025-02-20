'use client';
import { Pedido, StatusPedido } from "@/interfaces"
import { Card, CardContent, CardHeader } from "../ui/card"
import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { ButtonDeletePedido } from "./ButtonDeletePedido";
import { ButtonViewDetailsPedido } from "./ButtonViewDetailsPedido";
import { CalendarIcon } from "lucide-react";
import { ButtonEdit } from "../ButtonEdit";

export const PedidoItem = ({ pedido }: { pedido: Pedido }) => {

    const totalProducts = pedido.productos.reduce((acc, total) => (
        acc + total.cantidad
    ), 0);
    const statusLabel: Record<StatusPedido, string> = {
        pending: 'Pendiente',
        inProgress: 'En progreso',
        completed: 'Completado',
    };
    const fechaEntregaLocal = new Date(pedido.fechaEntrega);
    fechaEntregaLocal.setMinutes(fechaEntregaLocal.getMinutes() + fechaEntregaLocal.getTimezoneOffset());
    return (
        <Card className="relative">
            <div className="flex items-center gap-x-2 absolute right-2 top-2 z-10">
                {
                    pedido.status !== 'completed' && (
                        <ButtonEdit id={pedido.id} basePath="pedidos/editar-pedido" className="size-5" />
                    )
                }
                <ButtonViewDetailsPedido pedido={pedido} />
                <ButtonDeletePedido pedidoId={pedido.id} />
            </div>

            <CardHeader className="text-sm font-semibold">
                Pedido #{pedido.id}
            </CardHeader>
            <CardContent className="text-sm flex flex-col gap-y-2">
                <span><strong className="font-medium text-neutral-900">Cliente:</strong> {pedido.Cliente.nombre}</span>
                <span><strong className="font-medium text-neutral-900">Cantidad de productos:</strong> {totalProducts}</span>
                <span className="font-semibold text-neutral-700"><strong className="font-medium text-neutral-900">Precio total:</strong> {FormatoMoneda(pedido.totalPrice)}</span>
                <div className="flex items-center justify-between gap-x-2">
                    <span className={pedido.status === 'completed' ? 'text-green-500' : ''}><strong className="font-medium text-neutral-900">Estado:</strong> {statusLabel[pedido.status]}</span>
                    <div className="flex items-center gap-x-1">
                        <CalendarIcon size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{fechaEntregaLocal.toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
