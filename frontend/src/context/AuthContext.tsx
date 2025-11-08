"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import api from "@/lib/api";

type User = {
    id: number;
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Restore session on refresh
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const res = await api.get("/auth/me", { withCredentials: true });
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    // 🔐 Login function
    async function login(email: string, password: string) {
        const res = await api.post(
            "/auth/login",
            { email, password },
            { withCredentials: true } // ⬅️ this sends/receives cookies
        );
        setUser(res.data.user);
    }

    // 🚪 Logout function
    async function logout() {
        await api.post("/auth/logout", {}, { withCredentials: true });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
