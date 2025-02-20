'use client';

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { editClientWithId } from "@/actions";
import { toast } from "sonner";
import { Cliente } from "@/interfaces";

interface Props {
    userId: number;
    client:Cliente
}
type InputsClient = {
    nombre: string;
    ciudad: string;
    direccion?: string;
    status: 'Activo' | 'Inactivo'
}
export const FormEditClient = ({ userId,client }: Props) => {

    const { register, handleSubmit, formState: { isValid, isSubmitting }, control } = useForm<InputsClient>({
        defaultValues : {
            nombre:client.nombre,
            ciudad:client.ciudad,
            direccion:client.direccion ?? undefined,
            status:client.status
        }
    });
    const router = useRouter();
    const formAddClientSubmit: SubmitHandler<InputsClient> = async (data) => {
        const respuesta = await editClientWithId(client.id,userId,data.nombre,data.ciudad,data.direccion,data.status);
        if(!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        if(isValid) {
            toast.success(respuesta.message);
            router.back();
        }

    }

    return (
        <form onSubmit={handleSubmit(formAddClientSubmit)} className="flex flex-col gap-y-8 text-sm">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="nombre">Nombre*</label>
                <Input required id="nombre" type="text" {...register('nombre', { required: true })} placeholder="Ej: Juan Lopez" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 items-start">
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="ciudad">Ciudad*</label>
                    <Controller
                        name="ciudad"
                        control={control}
                        defaultValue={client.ciudad}
                        render={({ field }) => (
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar ciudad" />
                                </SelectTrigger>
                                <SelectContent id="ciudad">
                                    <SelectGroup>
                                        <SelectItem value="Santo Tome">Santo Tomé</SelectItem>
                                        <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                                        <SelectItem value="Rafaela">Rafaela</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="estado">Estado*</label>
                    <Controller
                        name="status"
                        defaultValue={client.status}
                        control={control}
                        render={({ field }) => (
                            <Select defaultValue={ field.value } onValueChange={ field.onChange } required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent id="estado">
                                    <SelectGroup>
                                        <SelectItem value="Activo">Activo</SelectItem>
                                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="direccion">Dirección</label>
                <Input id="direccion" type="text" {...register('direccion', { required: false })} placeholder="Ej: Avenida viva 123" />
            </div>
            <div className="flex items-center gap-x-4 justify-end">
                <Button variant={'outline'} type="button" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button variant={'default'} type="submit" disabled={isSubmitting}>
                    { isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}
