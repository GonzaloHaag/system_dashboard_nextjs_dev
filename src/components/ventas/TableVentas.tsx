import { getAllVentas } from "@/actions"
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { Pagination } from "../Pagination";
import { MetodoPago } from "@/interfaces/pedido";
import { ButtonDeleteVenta } from "./ButtonDeleteVenta";
import { ButtonViewVenta } from "./ButtonViewVenta";
interface Props {
    userId: number;
    searchQuery: string;
    page: number;
}
export const TableVentas = async ({ userId, searchQuery, page }: Props) => {

    const respuesta = await getAllVentas(userId, searchQuery, page);
    if (!respuesta.ok || !respuesta.ventas) {
        toast.error(respuesta.message)
    }
    const { ventas, totalPages,totalPriceVentas } = respuesta;

    const metodoPagoLabel: Record<MetodoPago, string> = {
        Efectivo: 'Efectivo',
        MercadoPago: 'Mercado pago',
        TarjetaCredito: 'Crédito',
        TarjetaDebito: 'Débito',
        Transferencia: 'Transferencia'
    };

    return (
        <div className="flex flex-col">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Método de pago
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ventas && ventas.length > 0 ? (
                                ventas.map((venta) => {
                                    // Ajusta la fecha de la venta a la zona horaria local
                                    const fechaLocal = new Date(venta.fecha);
                                    fechaLocal.setMinutes(fechaLocal.getMinutes() + fechaLocal.getTimezoneOffset());

                                    return (
                                        <tr key={venta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                #{venta.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {capitalizeFirstLetter(venta.Cliente.nombre)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {[metodoPagoLabel[venta.metodoPago]]}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {fechaLocal.toLocaleDateString()} {/* Muestra la fecha ajustada */}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {FormatoMoneda(venta.precioTotal)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-x-4">
                                                    <ButtonViewVenta venta={ venta } metodoPagoLabel={ metodoPagoLabel }  />
                                                    <ButtonDeleteVenta ventaId={venta.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })

                            )
                                :
                                (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                        <td colSpan={7} className="px-6 py-4 col-span-7">
                                            <div className="flex items-center justify-center text-center w-full">
                                                <p>No hay resultados</p>
                                            </div>
                                        </td>

                                    </tr>
                                )
                        }
                    </tbody>
                    <tfoot className="border border-t">
                        <tr className="font-medium text-gray-900">
                            <th scope="row" className="px-6 py-4 text-sm">Total</th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4 text-green-500 font-semibold">{FormatoMoneda(totalPriceVentas ?? 0)}</td>
                            <td className="px-6 py-4"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Pagination totalPages={totalPages!} />
        </div>
    )
}
