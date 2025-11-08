import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/app-topbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {/* Sidebar */}
            <AppSidebar />

            {/* Main content area */}
            <div className="flex flex-col min-h-screen w-full bg-(--color-gradient-apple) text-(--sidebar-text)">
                {/* 🔹 Topbar */}
                <Topbar />

                {/* 🔸 Content */}
                <main className="flex-1 p-6 md:p-8 lg:p-10 backdrop-blur-md border-t border-white/10 shadow-inner ">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
