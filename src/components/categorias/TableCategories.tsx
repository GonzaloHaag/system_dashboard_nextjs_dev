import { getAllCategories } from "@/actions"
import { toast } from "sonner";
import { ButtonEdit } from "../ButtonEdit";
import { ButtonDeleteCategory } from "./ButtonDeleteCategory";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { Pagination } from "../Pagination";
interface Props {
    userId: number;
    searchQuery: string;
    page:number;
}
export const TableCategories = async ({ userId, searchQuery,page }: Props) => {

    const respuesta = await getAllCategories(userId, searchQuery,page);
    if (!respuesta.ok || !respuesta.categorias) {
        toast.error(respuesta.message)
    }
    const { categorias,totalPages } = respuesta;
    return (
        <div className="flex flex-col">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
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
                            categorias && categorias.length > 0 ? (
                                categorias.map((category) => (
                                    <tr key={category.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            #{category.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {capitalizeFirstLetter(category.nombre)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {category.createdAt.toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <ButtonEdit basePath="categorias/editar-categoria" id={category.id} />
                                                <ButtonDeleteCategory categoryId={category.id} />
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
