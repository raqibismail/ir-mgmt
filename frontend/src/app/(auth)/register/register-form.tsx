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
import { useState } from "react"
import api from "@/lib/api"
import Link from "next/link"

interface RegisterData {
  email: string
  name: string
  password: string
}

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [registerData, setRegisterData] = useState<RegisterData>()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const password = formData.get("password") as string
    await api.post("/auth/register", { email, name, password }).then(() => router.push("login"))
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel className="text-slate-100" htmlFor="name">
              Name
            </FieldLabel>
            <Input
              className="bg-white/10 border border-white/20 text-white placeholder:text-(--placeholder) focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              name="name"
              id="name"
              type="name"
              placeholder="Enter Name"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="text-slate-100" htmlFor="email">
              Email
            </FieldLabel>
            <Input
              className="bg-white/10 border border-white/20 text-white placeholder:text-(--placeholder) focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              name="email"
              id="email"
              type="email"
              placeholder="Enter Email"
              required
            />
          </Field>

          <Field>
            <FieldLabel className="text-slate-100" htmlFor="password">
              Password
            </FieldLabel>
            <Input
              className="bg-white/10 border border-white/20 text-white placeholder:text-(--placeholder) focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              name="password"
              id="password"
              type="password"
              placeholder="Enter Password"
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sm font-medium text-slate-100 hover:text-indigo-700 underline hover:underline-offset-2 hover:underline transition-all duration-200"
            >
              Sign in
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
