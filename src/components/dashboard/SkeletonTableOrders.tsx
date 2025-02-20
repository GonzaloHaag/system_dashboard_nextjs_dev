import { Skeleton } from "../ui/skeleton"

export const SkeletonTableOrders = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <Skeleton className="w-full h-6" />
                        </th>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className='px-6 py-4'>
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <Skeleton className="w-full h-6" />
                        </th>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className='px-6 py-4'>
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <Skeleton className="w-full h-6" />
                        </th>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className='px-6 py-4'>
                            <Skeleton className="w-full h-6" />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton className="w-full h-6" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
