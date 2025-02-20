import { BadgeDollarSignIcon, BoxIcon, ShoppingBagIcon, UsersIcon } from "lucide-react"
import { CardSkeleton } from "./CardSkeleton"
import { Skeleton } from "../ui/skeleton"
import { SkeletonTableOrders } from "./SkeletonTableOrders"

export const DashboardPageContainerSkeleton = () => {
    return (
        <section className="w-full flex flex-col gap-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <CardSkeleton Icon={ShoppingBagIcon} title="Ventas totales" />
                <CardSkeleton Icon={BadgeDollarSignIcon} title="Total recaudado" />
                <CardSkeleton Icon={BoxIcon} title="Productos totales" />
                <CardSkeleton Icon={UsersIcon} title="Clientes activos" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-neutral-900 font-medium text-lg text-center">Ventas totales</h2>
                    <Skeleton className="w-full h-[400px]" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-neutral-900 font-medium text-lg text-center">Ganancias totales</h2>
                    <Skeleton className="w-full h-[400px]" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Órdenes recientes</h2>
                <SkeletonTableOrders />
            </div>
        </section>
    )
}
