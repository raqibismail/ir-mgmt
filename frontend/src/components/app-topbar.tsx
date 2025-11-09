"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useSelectedLayoutSegments, usePathname, useSelectedLayoutSegment, useRouter } from "next/navigation"


export function Topbar() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const segments = useSelectedLayoutSegments()
    const pathName = usePathname()

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }

    return (
        <header className="sticky top-0 z-40 flex items-center justify-between bg-[rgba(26,28,60,0.6)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.1)] shadow-[0_2px_10px_rgba(0,0,0,0.2)] px-6 py-3">
            {/* Left section */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="text-slate-100" />
                <h1 className="text-lg font-semibold tracking-tight text-slate-50">
                    {pathName}
                </h1>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full border border-white/20 hover:border-indigo-400/40 hover:bg-white/10 transition-all"
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarImage
                                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user?.name ?? "user"}`}
                                    alt={user?.name ?? "User"}
                                />
                                <AvatarFallback className="bg-indigo-600 text-white">
                                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-56 bg-[rgba(30,30,60,0.9)] backdrop-blur-lg border border-white/10 text-slate-100"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel>
                            <div className="flex flex-col">
                                <span className="font-medium">{user?.name ?? "Guest"}</span>
                                <span className="text-xs text-slate-400">{user?.email ?? ""}</span>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-white/10" />

                        <DropdownMenuItem
                            onClick={() => router.push("/profile")}
                            className="hover:bg-white/10 cursor-pointer"
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push("/settings")}
                            className="hover:bg-white/10 cursor-pointer"
                        >
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-white/10" />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
