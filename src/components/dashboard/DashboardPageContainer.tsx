'use server';
import { getDataAllDashboard } from "@/actions";
import { CardDashboard, CardSkeleton, SalesChart, SkeletonTableOrders, TableOrders, WinningsChart } from "@/components";
import { BadgeDollarSignIcon, BoxIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";
export const DashboardPageContainer = async ({ userId }: { userId: number }) => {

    const responseDashboard = await getDataAllDashboard(userId);
    if (!responseDashboard.ok) {
        toast.error(responseDashboard.message)
        return;
    }
    return (
        <section className="w-full flex flex-col gap-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Suspense fallback={<CardSkeleton Icon={ShoppingBagIcon} title="Ventas totales" />}>
                    <CardDashboard Icon={ShoppingBagIcon} title="Ventas totales" price={responseDashboard.totalSalesPrice || 0} />
                </Suspense>
                <Suspense fallback={<CardSkeleton Icon={BadgeDollarSignIcon} title="Total recaudado" />}>
                    <CardDashboard Icon={BadgeDollarSignIcon} title="Total recaudado" price={responseDashboard.totalGanancias || 0} />
                </Suspense>
                <Suspense fallback={<CardSkeleton Icon={BoxIcon} title="Productos totales" />}>
                    <CardDashboard Icon={BoxIcon} title="Productos totales" value={responseDashboard.totalCountProducts} />
                </Suspense>
                <Suspense fallback={<CardSkeleton Icon={UsersIcon} title="Clientes activos" />}>
                    <CardDashboard Icon={UsersIcon} title="Clientes activos" value={responseDashboard.totalCountClientsActive} />
                </Suspense>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-neutral-900 font-medium text-lg text-center">Ventas totales</h2>
                    <SalesChart data={responseDashboard.data || []} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-neutral-900 font-medium text-lg text-center">Ganancias totales</h2>
                    <WinningsChart data={ responseDashboard.dataGananciasPorMes || []} />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Órdenes recientes</h2>
                <Suspense fallback={<SkeletonTableOrders />}>
                    <TableOrders userId={userId} />
                </Suspense>
            </div>
        </section>
    )
}
