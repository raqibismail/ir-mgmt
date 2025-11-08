'use client';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardComponent() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout().then(() => {
            router.refresh();
        });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
