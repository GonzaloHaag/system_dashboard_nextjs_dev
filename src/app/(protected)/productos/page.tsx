import { auth } from "@/auth.config";
import { SearchBarAndButtons, SkeletonTableProducts,TableProducts } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export const metadata:Metadata = {
   title:'Productos'
}

export default async function ProductosPage(props:{
  searchParams?:Promise<{
    search?:string;
    page?:string;
    category?:string;
  }>
}) {

  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }
  const userId = parseInt(session.user.id);

  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search ?? '';
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  return (
    <section className="w-full flex flex-col gap-y-6">
      <SearchBarAndButtons placeholder="Buscar producto..." textButton="Nuevo producto" linkHref='/productos/nuevo-producto' buttonImportarCsv={true} />
      <Suspense key={ searchQuery } fallback={<SkeletonTableProducts />}>
        <TableProducts userId={userId} searchQuery={ searchQuery } page={ page } />
      </Suspense>
    </section>
  );
}