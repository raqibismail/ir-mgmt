"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  // ✨ Animation Variants (fade + slide)
  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <div className="bg-gradient-apple flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathName}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            layoutId="auth-card"
          >
            <Card
              className="
                bg-(--auth-card)
                backdrop-blur-xl
                border border-white/20
                shadow-(--auth-card-shadow)
                hover:shadow-(--auth-card-shadow-hover)
                transition-all duration-300
                rounded-2xl
              "
            >
              <CardHeader>
                <CardTitle className="text-slate-50 text-2xl font-semibold text-center">
                  {pathName === "/login" ? "Welcome Back" : "Create an Account"}
                </CardTitle>
                <CardDescription className="text-slate-100/80 text-center">
                  {pathName === "/login"
                    ? "Sign in to continue"
                    : "Join us to get started"}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
