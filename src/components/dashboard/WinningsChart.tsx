'use client';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FormatoMoneda } from "@/lib/FormatoMoneda";

export const WinningsChart = ({ data }: { data: { name: string, Ganancias: number }[] }) => {
    return (
        <div className="w-full h-[400px] text-sm">
            {
                data.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">No hay datos disponibles para mostrar</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={data}>
                            <Bar dataKey="Ganancias" barSize={40} />
                            {/* <CartesianGrid strokeDasharray="1 1" /> */}
                            <XAxis dataKey='name' />
                            <YAxis tickFormatter={FormatoMoneda} width={100} />
                            <Tooltip formatter={(value) => [`${FormatoMoneda(Number(value))}`, 'Total']} cursor={false} />
                        </BarChart>
                    </ResponsiveContainer >
                )
            }
        </div >
    )
}
