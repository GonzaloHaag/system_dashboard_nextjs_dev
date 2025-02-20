import { auth } from "@/auth.config";
import { ButtonExportCsv, SearchBar, SkeletonTableVentas, TableVentas } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: 'Ventas'
}

export default async function VentasPage(props: {
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
      <div className='w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sm:h-10'>
        <SearchBar placeholder={'Buscar venta...'} />
        <div className='flex items-center gap-x-4 h-full'>
          <ButtonExportCsv />
        </div>
      </div>
      <Suspense key={searchQuery} fallback={<SkeletonTableVentas />}>
        <TableVentas userId={userId} searchQuery={searchQuery} page={page} />
      </Suspense>
    </section>
  );
}