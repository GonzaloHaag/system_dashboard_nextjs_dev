'use client';

import { ClipboardListIcon, LayoutDashboardIcon, LayoutPanelTopIcon, ReceiptIcon, UsersIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

const items = [
    {
        title:'Dashboard',
        path:'/dashboard',
        icon: LayoutDashboardIcon
    },
    {
        title:'Clientes',
        path:'/clientes',
        icon: UsersIcon
    },
    {
        title:'Categorías',
        path:'/categorias',
        icon: UsersIcon
    },
    {
        title:'Productos',
        path:'/productos',
        icon: LayoutPanelTopIcon
    },
    {
        title:'Pedidos',
        path:'/pedidos',
        icon: ClipboardListIcon
    },
    {
        title:'Ventas',
        path:'/ventas',
        icon: ReceiptIcon
    },
]
export function AppSideBar() {
    const { data,status } = useSession();
    const pathname = usePathname();   
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-x-2">
                    {/* <Image src={'/images/LOGOGH.webp'} priority alt="logo gonzalo haag" width={120} height={40} /> */}
                    <span className="text-xl">GH</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Sistema
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {
                            items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.path} title={item.title} className={`transition-colors duration-200 ${pathname === item.path ? 'bg-slate-900 text-slate-100 hover:bg-slate-800 hover:text-slate-100' : 'bg-inherit'}`}>
                                          <item.icon />
                                          <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
               <NavUser user={ data?.user } status={status} />
            </SidebarFooter>
        </Sidebar>
    )
}