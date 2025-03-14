import { auth } from "@/auth.config";
import { ButtonExportCsvCategories, SearchBarAndButtons, SkeletonTableCategories, TableCategories } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: 'Categorias'
}

export default async function CategoriasPage(props: {
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
      <SearchBarAndButtons placeholder="Buscar categoría..." textButton="Nueva categoría" linkHref='/categorias/nueva-categoria'>
          <ButtonExportCsvCategories userId={ userId } />
      </SearchBarAndButtons>
      <Suspense key={searchQuery} fallback={<SkeletonTableCategories />}>
        <TableCategories userId={userId} searchQuery={searchQuery} page={ page } />
      </Suspense>

    </section>
  );
}