import { getAllProducts } from "@/actions"
import { toast } from "sonner";
import { ButtonEdit } from "../ButtonEdit";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { ButtonDeleteProduct } from "./ButtonDeleteProduct";
import { Pagination } from "../Pagination";
interface Props {
    userId: number;
    searchQuery: string;
    page: number;
}
export const TableProducts = async ({ userId, searchQuery, page }: Props) => {

    const respuesta = await getAllProducts(userId, searchQuery, page);
    if (!respuesta.ok || !respuesta.products) {
        toast.error(respuesta.message)
    }
    const { products, totalPages } = respuesta;

    return (
        <div className="flex flex-col">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Costo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoría
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {capitalizeFirstLetter(product.titulo)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {FormatoMoneda(product.costo)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {FormatoMoneda(product.precio)}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.Category.nombre}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='w-6 h-6 rounded-full' style={{ backgroundColor: product.color }}></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <ButtonEdit basePath="productos/editar-producto" id={product.id} />
                                                <ButtonDeleteProduct productId={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))

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
                </table>
            </div>
            <Pagination totalPages={totalPages!} />
        </div>
    )
}
