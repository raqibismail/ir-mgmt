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
import Image from "next/image";

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
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center py-20">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 mb-10 text-center">
          ICUR
        </h1>
      </div>
      <main className="flex flex-1 justify-center">
        <div
          className="w-full max-w-md  rounded-2xl 
                  text-slate-100"
        >
          <motion.div
            key={pathName}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            layoutId="auth-card"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
