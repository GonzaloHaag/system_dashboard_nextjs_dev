export type StatusPedido = 'pending' | 'inProgress' | 'completed'
export type MetodoPago = 'TarjetaCredito' | 'TarjetaDebito' | 'MercadoPago' | 'Efectivo' | 'Transferencia'


interface ClientePedido {
    id: number;
    nombre: string;
    ciudad: string;
    direccion: string | null;
}

interface ProductoPedido {
    id: number;
    titulo: string;
    precio: number;
}

interface ProductosEnPedido {
    id: number;
    cantidad: number;
    product: ProductoPedido;
}

export interface Pedido {
    id: number;
    Cliente: ClientePedido;
    usuarioId: number;
    productos: ProductosEnPedido[];
    createdAt: Date;
    fechaEntrega: Date;
    status: StatusPedido;
    totalPrice: number;
    totalProducts: number;
    nota: string | null;
    metodoPago: MetodoPago;
    descuento:number;
}
export interface Column {
    id: StatusPedido
    title: string
}

