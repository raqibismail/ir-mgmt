"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-transparent py-4">
      <div className="mx-auto max-w-7xl px-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight text-slate-50">
            ICUR
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full border border-white/20 
                hover:border-indigo-400/40 hover:bg-white/10 transition-all"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={''}
                    alt={user?.name ?? "User"}
                  />
                  <AvatarFallback className="bg-indigo-600 text-white">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56 bg-[rgba(30,30,60,0.95)] backdrop-blur-xl 
              border border-white/10 text-slate-100 rounded-xl shadow-md"
              align="end"
              forceMount
            >
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-slate-400">
                    {user?.email ?? ""}
                  </span>
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
      </div>
    </header>
  );
}
