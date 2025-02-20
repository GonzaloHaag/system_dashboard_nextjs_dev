'use client';

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import { SelectContent, SelectGroup, SelectItem, Select as SelectShadcn, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addPedido } from "@/actions";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { useCallback, useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { FormatoMoneda } from "@/lib/FormatoMoneda";

interface Props {
    userId: number;
    clientes: {
        id: number;
        nombre: string;
    }[];
    productos: {
        id: number;
        titulo: string;
        stock: number;
        color: string;
        precio: number;
    }[];
}

type InputsPedido = {
    clienteType: { label: string, value: number }
    fechaEntrega: string;
    estado: 'pending' | 'inProgress' | 'completed';
    productos: number[];
    nota: string;
    metodoPago: 'TarjetaCredito' | 'TarjetaDebito' | 'MercadoPago' | 'Efectivo' | 'Transferencia';
    descuento: number;
}

export const FormAddPedido = ({ userId, clientes, productos }: Props) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { isValid, isSubmitting }, control, watch } = useForm<InputsPedido>({
        defaultValues: {
            estado: 'pending',
            nota: '',
            metodoPago: 'MercadoPago',
            descuento: 0
        }
    });

    const [orderItems, setOrderItems] = useState<{ productId: number, quantity: number }[]>([]);
    const [totalPriceItems, setTotalPriceItems] = useState<number>(0);
    const discount = watch('descuento');
    const buttonAddProduct = () => {
        if (orderItems.length === productos.length) {
            toast.error('No hay suficientes productos para agregar');
            return;
        }
        setOrderItems([...orderItems, { productId: 0, quantity: 1 }]);
    }

    const removeProduct = (index: number) => {
        const newOrdersItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(newOrdersItems);
    }

    const updateOrderItem = (index: number, productId: number, productQuantity: number) => {
        // Verificar si el producto está seleccionado
        if (productId === 0) {
            toast.error('Debes elegir un producto');
            return;
        }

        // Encontrar el producto en la lista de productos
        const productFind = productos.find((producto) => producto.id === productId);
        if (!productFind) {
            toast.error('Producto no encontrado');
            return;
        }

        // Verificar si hay suficiente stock
        if (productFind.stock < productQuantity) {
            toast.warning('No hay suficiente stock');
            return;
        }

        // Actualizar el estado de los productos en el pedido
        const oldOrdersItems = [...orderItems];
        oldOrdersItems[index] = { productId: productId, quantity: productQuantity };
        setOrderItems(oldOrdersItems);
    };

    const formAddPedidoSubmit: SubmitHandler<InputsPedido> = async (data) => {
        if (orderItems.length === 0) {
            toast.error('Debes agregar al menos un producto');
            return;
        }

        // Verificar stock antes de guardar
        const stockErrors = orderItems.filter(orderItem => {
            const product = productos.find(p => p.id === orderItem.productId);
            return product && product.stock < orderItem.quantity;
        });

        if (stockErrors.length > 0) {
            toast.error('No hay suficiente stock para uno o más productos');
            return;
        }

        const respuesta = await addPedido({
            userId: userId,
            clienteId: data.clienteType.value,
            ordersItems: orderItems,
            estado: data.estado,
            fechaEntrega: data.fechaEntrega,
            nota: data.nota,
            metodoPago: data.metodoPago,
            descuento: data.descuento
        });

        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }

        if (isValid) {
            toast.success(respuesta.message);
            router.back();
        }
    }

    const clientsOptions = clientes.map((cliente) => ({
        label: capitalizeFirstLetter(cliente.nombre),
        value: cliente.id
    }));
    const availableProductsOptions = productos
        .filter((producto) => !orderItems.some((orderItem) => orderItem.productId === producto.id))
        .map((producto) => ({
            label: producto.titulo, // Usar solo el texto para evitar el error
            value: producto.id,
            color: producto.color, // Agregar el color como dato extra
            stock: producto.stock
        }));

        // Se recrea la funcion solo si productos cambia

    const calcularTotalItems = useCallback((items: { productId: number; quantity: number }[]) => {
        let total = 0;
        items.forEach((item) => {
            const product = productos.find((p) => p.id === item.productId);
            if (product) {
                total += product.precio * item.quantity;
            }
        });

        return total;
    }, [productos]); // Dependencia: productos

    useEffect(() => {
        const total = calcularTotalItems(orderItems);
        const discountAmount = (total * discount) / 100;
        setTotalPriceItems(total - discountAmount);
    }, [orderItems, discount, calcularTotalItems])

    return (
        <form onSubmit={handleSubmit(formAddPedidoSubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="cliente">Cliente*</label>
                <Controller
                    name="clienteType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            id="cliente"
                            required
                            className="w-full focus:outline-neutral-900"
                            placeholder='Seleccionar cliente'
                            noOptionsMessage={() => 'No se encontraron resultados'}
                            {...field}
                            isClearable
                            options={clientsOptions}
                        />
                    )}
                />
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label>Productos*</label>
                {
                    orderItems.length > 0 && orderItems.map((orderItem, index) => (
                        <div key={index} className="grid grid-cols-9 items-center gap-x-6">
                            <Select
                                id={`producto-${index}`}
                                required
                                className="w-full col-span-6 focus:outline-neutral-900"
                                placeholder='Seleccionar producto'
                                value={availableProductsOptions.find((product) => product.value === orderItem.productId)}
                                onChange={(selectedOption) => updateOrderItem(index, selectedOption?.value || 0, orderItem.quantity)}
                                noOptionsMessage={() => 'No se encontraron resultados'}
                                options={availableProductsOptions}
                                formatOptionLabel={(e) => (
                                    <div className="flex items-center justify-between gap-x-1 w-full">
                                        <div className="flex items-center gap-x-2">
                                            <span className="flex-1">{capitalizeFirstLetter(e.label)}</span>
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: e.color }}></div>
                                        </div>
                                        <div className="flex items-center gap-x-1 text-gray-400 text-xs">
                                            <span>Stock:</span>
                                            <span>{e.stock}</span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Input type="number"
                                placeholder="Cantidad"
                                required
                                value={orderItem.quantity}
                                onChange={(e) => updateOrderItem(index, orderItem.productId, Number.parseInt(e.target.value) || 1)}
                                className="w-full col-span-2" min={1} />
                            <Button type="button" variant={'destructive'} title="Eliminar producto" className="col-span-1" onClick={() => removeProduct(index)}>
                                <Trash2Icon />
                            </Button>
                        </div>
                    ))
                }
                <Button variant={'default'} type="button" title="Agregar producto" onClick={buttonAddProduct}>
                    Agregar producto
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="estado">Estado*</label>
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue="pending"
                        render={({ field }) => (
                            <SelectShadcn value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent id="estado">
                                    <SelectGroup>
                                        <SelectItem value={'pending'}>Pendiente</SelectItem>
                                        <SelectItem value={'inProgress'}>En progreso</SelectItem>
                                        <SelectItem value={'completed'}>Completado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </SelectShadcn>
                        )}
                    />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="fecha_entrega">Fecha de entrega *</label>
                    <Input type="date" id="fecha_entrega" required {...register('fechaEntrega', { required: true })} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8">
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="descuento">Descuento (%)*</label>
                    <Input
                        type="number"
                        id="descuento"
                        min={0}
                        max={100}
                        defaultValue={0}
                        required
                        {...register("descuento", { required: true, min: 0, max: 100 })}
                        placeholder="0"
                    />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="metodoPago">Método de pago*</label>
                    <Controller
                        name="metodoPago"
                        control={control}
                        defaultValue="MercadoPago"
                        render={({ field }) => (
                            <SelectShadcn value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar método de pago" />
                                </SelectTrigger>
                                <SelectContent id="metodoPago">
                                    <SelectGroup>
                                        <SelectItem value={'MercadoPago'}>Mercado Pago</SelectItem>
                                        <SelectItem value={'Transferencia'}>Transferencia</SelectItem>
                                        <SelectItem value={'Efectivo'}>Efectivo</SelectItem>
                                        <SelectItem value={'TarjetaCredito'}>Crédito</SelectItem>
                                        <SelectItem value={'TarjetaDebito'}>Débito</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </SelectShadcn>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-1">
                <span>Total: </span>
                <Badge>{FormatoMoneda(totalPriceItems)}</Badge>
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="nota">Nota</label>
                <Textarea {...register('nota', { required: false })} placeholder="Agregá una nota para el pedido" />
            </div>

            <div className="flex items-center gap-x-4 justify-end">
                <Button variant={'outline'} type="button" onClick={() => router.back()} title="Cancelar">
                    Cancelar
                </Button>
                <Button variant={'default'} type="submit" disabled={isSubmitting} title="Guardar">
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}