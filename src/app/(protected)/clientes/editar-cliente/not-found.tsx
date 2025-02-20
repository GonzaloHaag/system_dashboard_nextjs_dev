import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, SearchXIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: 'Cliente no encontrado'
}
export default function NotFoundClientePage() {
  return (
    <section className="w-full py-20 flex flex-col gap-y-3 justify-center text-center items-center">
      <h1 className="flex items-center text-2xl gap-x-4">Cliente no encontrado <SearchXIcon /></h1>
      <span className="text-sm text-neutral-400">Lo sentimos, no pudimos encontrar el cliente que estás buscando</span>
      <Link href={'/clientes'} title="Clientes" className={buttonVariants({ variant: 'outline' })}>
        <ArrowLeftIcon /> Ver todos los clientes
      </Link>
    </section>
  );
}