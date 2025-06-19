"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen grid place-items-center p-8">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen grid place-items-center p-8">
        <div className="text-center">
          <p>Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome to your personal dashboard
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent">
              <h2 className="text-sm font-medium mb-2">Profile Information</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Name:{" "}
                  </span>
                  {user.name || "Not set"}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Email:{" "}
                  </span>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="border border-neutral-300 text-neutral-300 py-2 px-10 w-full rounded-full cursor-pointer hover:bg-neutral-900"
          onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  );
}
