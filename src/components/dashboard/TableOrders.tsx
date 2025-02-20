import { getAllPedidos } from "@/actions"
import { StatusPedido } from "@/interfaces";
import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { toast } from "sonner";

export const TableOrders = async ({ userId }: { userId: number }) => {

    const respuesta = await getAllPedidos(userId,'');
    if (!respuesta.ok || !respuesta.pedidos) {
        toast.error(respuesta.message);
        return;
    }

    const { pedidos } = respuesta;
    const statusLabel: Record<StatusPedido, string> = {
        pending: 'Pendiente',
        inProgress: 'En progreso',
        completed: 'Completado',
    };
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cliente
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.length > 0 ? (
                            pedidos.map((pedido) => (
                                <tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pedido.Cliente.nombre}
                                    </th>
                                    <td className="px-6 py-4">
                                        {FormatoMoneda(pedido.totalPrice)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pedido.createdAt.toLocaleDateString()}
                                    </td>
                                    <td className={`px-6 py-4 ${pedido.status === 'completed' ? 'text-green-500' : ''}`}>
                                        {statusLabel[pedido.status]}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                <td colSpan={4} className="px-6 py-4 col-span-7">
                                    <div className="flex items-start justify-start text-start w-full">
                                        <p>No hay órdenes recientes</p>
                                    </div>
                                </td>

                            </tr>
                        )

                    }

                </tbody>
            </table>
        </div>

    )
}
