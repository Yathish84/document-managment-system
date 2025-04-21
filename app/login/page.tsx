"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FileText, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      await login(email, password)
    } catch (err) {
      setError("Failed to login. Please check your credentials.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-bold text-xl"
        >
          <FileText className="h-6 w-6 text-teal-600" />
          <span>DocuQuery</span>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:text-teal-600"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="grid gap-2 text-sm">
              <p className="text-center text-muted-foreground">
                Use these demo accounts:
              </p>
              <div className="grid grid-cols-3 gap-20 text-center">
                <div className="rounded-md border p-2 w-max">
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
                <div className="rounded-md border p-2 w-max">
                  <p className="font-medium">Editor</p>
                  <p className="text-xs text-muted-foreground">
                    editor@example.com
                  </p>
                </div>
                <div className="rounded-md border p-2 w-max">
                  <p className="font-medium">Viewer</p>
                  <p className="text-xs text-muted-foreground">
                    viewer@example.com
                  </p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Use any password
              </p>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-teal-600 hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
