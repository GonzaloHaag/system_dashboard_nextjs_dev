'use client';
import { FormatoMoneda } from '@/lib/FormatoMoneda';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

export const SalesChart = ({ data }: { data: { name: string, ventas: number }[] }) => {
    return (
        <div className='w-full h-[400px] text-sm'>
            {
                data.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">No hay datos disponibles para mostrar</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={FormatoMoneda} width={100} />
                            <Tooltip formatter={(value) => [`${FormatoMoneda(Number(value))}`, 'Total']} cursor={false} />
                            <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#1d4ed8" />
                        </AreaChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    )
}
