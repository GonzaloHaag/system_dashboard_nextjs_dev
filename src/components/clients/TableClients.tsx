import { getAllClients } from "@/actions"
import { toast } from "sonner";
import { ButtonDeleteClient } from "./ButtonDeleteClient";
import { ButtonEdit } from "../ButtonEdit";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { Pagination } from "../Pagination";
interface Props {
    userId: number;
    searchQuery: string;
    page: number;
}
export const TableClients = async ({ userId, searchQuery, page }: Props) => {

    const respuesta = await getAllClients(userId, searchQuery,page);
    if (!respuesta.ok || !respuesta.clients) {
        toast.error(respuesta.message)
    }
    const { clients,totalPages } = respuesta;
    return (
        <div className="flex flex-col">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ciudad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha de creación
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients && clients.length > 0 ? (
                                clients.map((client) => (
                                    <tr key={client.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {capitalizeFirstLetter(client.nombre)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {client.ciudad === 'Santo Tome' ? 'Santo Tomé' : client.ciudad}
                                        </td>
                                        <td className={`px-6 py-4 ${client.status === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                                            {client.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.createdAt.toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <ButtonEdit basePath="clientes/editar-cliente" id={client.id} />
                                                <ButtonDeleteClient clientId={client.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            )
                                :
                                (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                        <td colSpan={5} className="px-6 py-4 col-span-5">
                                            <div className="flex items-center justify-center text-center w-full">
                                                <p>No hay resultados</p>
                                            </div>
                                        </td>

                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
            <Pagination totalPages={ totalPages! } />
        </div>

    )
}
