"use client"

import {
    ChevronsUpDown,
    CircleUserIcon,
    CreditCard,
    LogOut,
    SettingsIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { LogoutUser } from "@/actions"
import { Skeleton } from "./ui/skeleton"

interface Props {
    user: {
        id: string;
        email: string;
        nombre: string;
        nombreSistema: string;
        logoSistema: string | null;
        avatar: string | null;
        role: "Admin" | "Superadmin";
    } | undefined;
    status: "authenticated" | "loading" | "unauthenticated"
}

export function NavUser({
    user, status
}: Props) {
    const { isMobile } = useSidebar()



    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    {
                        status === 'loading' ? (
                            <SidebarMenuButton
                                size="lg"
                                className="pointer-events-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                {/* Avatar skeleton */}
                                <Skeleton className="h-8 w-8 rounded-lg" />

                                {/* Text content skeleton */}
                                <div className="grid flex-1 gap-1.5 text-left">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>

                                {/* Icon placeholder */}
                                <div className="ml-auto size-4 opacity-50">
                                    <ChevronsUpDown className="size-4" />
                                </div>
                            </SidebarMenuButton>
                        ) : (
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">{user?.nombre.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.nombre}</span>
                                        <span className="truncate text-xs font-medium text-gray-500">{user?.role}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                        )
                    }
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg">{user?.nombre.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.nombre}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUserIcon />
                                Cuenta
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <SettingsIcon />
                                Ajustes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Pagos
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <button type="button" className="flex items-center gap-x-2" onClick={LogoutUser}>
                                <LogOut />
                                Cerrar sesión
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
