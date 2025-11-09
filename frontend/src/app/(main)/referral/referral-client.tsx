'use client';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardComponent() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Referral</h1>
        </div>
    );
}
