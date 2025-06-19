"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (data.error) {
      setError(data.error.message || "An error occurred during sign in");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20 dark:focus:ring-white/20">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
