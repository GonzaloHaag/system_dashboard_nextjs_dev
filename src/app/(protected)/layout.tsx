import { auth } from "@/auth.config";
import { Provider } from "@/components";
import { AppSideBar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  {/*Proteger todas mis rutas dentro de protected */ }
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  return (
    <Provider>
      <SidebarProvider>
        <AppSideBar />
        <main className="w-full flex flex-col px-2">
          <header className="flex items-center justify-between gap-2 border-sidebar-border bg-sidebar border shadow rounded-md px-2 h-10 mt-2">
            <div className="flex items-center gap-x-2">
              <SidebarTrigger />
              <span className="text-sm text-slate-400 hidden md:block">Controlá tu negocio</span>
            </div>
          </header>
          {/* main content */}
          <div className="border-sidebar-border bg-sidebar border shadow rounded-md h-full p-4">
            {children}
            {modal}
          </div>
        </main>
      </SidebarProvider>
    </Provider>
  );
}