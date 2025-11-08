'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        await login(email, password).then(() => router.refresh())
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FieldGroup>
                    <Field>
                        <FieldLabel className="text-slate-100" htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input
                            className="bg-white/10 border border-white/20 text-white placeholder:text-(--placeholder) focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </Field>

                    <Field>
                        <div className="flex items-center">
                            <FieldLabel className="text-slate-100" htmlFor="password">
                                Password
                            </FieldLabel>
                            {/* <a
                                        href="#"
                                        className="ml-auto inline-block text-sm text-slate-100/90 hover:text-white hover:underline-offset-2 hover:underline transition-all duration-200"
                                    >
                                        Forgot password?
                                    </a> */}
                        </div>
                        <Input
                            className="bg-white/10 border border-white/20 text-white placeholder:text-(--placeholder) focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </Field>

                    <div className="space-y-3 pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium py-2 rounded-lg shadow-md shadow-indigo-800/30 transition-all"
                        >
                            Login
                        </Button>
                    </div>

                    <div className="text-sm text-center text-slate-100 pt-2 ">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-sm font-medium text-slate-100 hover:text-indigo-700 underline hover:underline-offset-2 hover:underline transition-all duration-200"
                        >
                            Sign up
                        </Link>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}
