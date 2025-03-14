import { auth } from "@/auth.config";
import { ButtonExportCsvClients, SearchBarAndButtons, SkeletonTableClients, TableClients } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: 'Clientes'
}

export default async function ClientesPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
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
      <SearchBarAndButtons placeholder="Buscar cliente..." textButton="Nuevo cliente" linkHref='/clientes/nuevo-cliente'>
          <ButtonExportCsvClients userId={ userId } />
      </SearchBarAndButtons>
      <Suspense key={searchQuery} fallback={<SkeletonTableClients />}>
        <TableClients userId={userId} searchQuery={searchQuery} page={page} />
      </Suspense>
    </section>
  );
}