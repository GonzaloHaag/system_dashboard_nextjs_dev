'use client';
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Pedido, StatusPedido } from "@/interfaces";
import { PedidoItem } from "./PedidoItem";
import { createVentaWithPedidoId, updatePedidoStatus } from "@/actions";
import { toast } from "sonner";

type Column = {
    id: string;
    title: string;
    pedidos: Pedido[];
};

type BoardProps = {
    initialPedidos: Pedido[];
};

export const PedidosPageContainer = ({ initialPedidos }: BoardProps) => {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "pending",
            title: "Pendientes",
            pedidos: initialPedidos.filter((p) => p.status === "pending"),
        },
        {
            id: "inProgress",
            title: "En progreso",
            pedidos: initialPedidos.filter((p) => p.status === "inProgress"),
        },
        {
            id: "completed",
            title: "Completados",
            pedidos: initialPedidos.filter((p) => p.status === "completed"),
        },
    ]);

    useEffect(() => {
        setColumns([
            {
                id: "pending",
                title: "Pendientes",
                pedidos: initialPedidos.filter((p) => p.status === "pending"),
            },
            {
                id: "inProgress",
                title: "En progreso",
                pedidos: initialPedidos.filter((p) => p.status === "inProgress"),
            },
            {
                id: "completed",
                title: "Completados",
                pedidos: initialPedidos.filter((p) => p.status === "completed"),
            },
        ]);
    }, [initialPedidos]);
    
    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destColumn = columns.find((col) => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) return;

        const sourcePedidos = Array.from(sourceColumn.pedidos);
        const destPedidos =
            source.droppableId === destination.droppableId ? sourcePedidos : Array.from(destColumn.pedidos);

        const [movedPedido] = sourcePedidos.splice(source.index, 1);

        if (destColumn.id === "completed" && destPedidos.some((p) => p.id === movedPedido.id)) {
            toast.error("El pedido ya está en la columna Completados.");
            return;
        }

        destPedidos.splice(destination.index, 0, { ...movedPedido, status: destColumn.id as Pedido["status"] });

        const newColumns = columns.map((col) => {
            if (col.id === source.droppableId) {
                return { ...col, pedidos: sourcePedidos };
            }
            if (col.id === destination.droppableId) {
                return { ...col, pedidos: destPedidos };
            }
            return col;
        });

        setColumns(newColumns);

        if (destColumn.id === "completed") {
            const ventaResponse = await createVentaWithPedidoId(movedPedido.id);
            if (!ventaResponse.ok) {
                toast.error(ventaResponse.message);
                setColumns((prevColumns) => {
                    return prevColumns.map((col) => {
                        if (col.id === source.droppableId) {
                            return { ...col, pedidos: [...col.pedidos, { ...movedPedido, status: sourceColumn.id as StatusPedido }] };
                        }
                        if (col.id === destination.droppableId) {
                            return { ...col, pedidos: col.pedidos.filter((p) => p.id !== movedPedido.id) };
                        }
                        return col;
                    });
                });
                return;
            }
            toast.success(ventaResponse.message);
        }

        const respuesta = await updatePedidoStatus(movedPedido.id, destColumn.id as StatusPedido);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }

        toast.success(respuesta.message);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {columns.map((column) => (
                    <div key={column.id} className="p-2">
                        <div className="flex items-center gap-x-2 justify-center">
                            <h2 className="font-semibold">{column.title}</h2>
                            <div className="flex items-center justify-center text-center w-5 h-5 p-3 rounded-full bg-slate-300 text-xs">
                                {column.pedidos.length}
                            </div>
                        </div>
                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`space-y-2 min-h-[300px] max-h-[700px] overflow-y-auto overflow-x-hidden ${snapshot.isDraggingOver ? "bg-gray-100" : ""
                                        }`}
                                >
                                    {column.pedidos.map((pedido, index) => (
                                        <Draggable
                                            key={pedido.id}
                                            draggableId={pedido.id.toString()}
                                            index={index}
                                            isDragDisabled={column.id === "completed"}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`p-4 rounded shadow ${snapshot.isDragging ? "opacity-50" : ""}`}
                                                >
                                                    <PedidoItem pedido={pedido} />
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};