"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== "salon@gmail.com" || password !== "salon") {
      setError("Use salon@gmail.com and salon to enter the staff portal.");
      return;
    }
    setLoading(true);

    // TODO: replace with real auth call to your backend
    // await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) })

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* ---------- Left Panel ---------- */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#2C7A6E] p-12 lg:flex">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-white/5" />

        {/* Logo */}
        <Link href="/" className="relative z-10 inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold text-white backdrop-blur">
            S
          </span>
          <span className="text-xl font-semibold tracking-tight text-white">
            SalonBook
          </span>
        </Link>

        {/* Hero text */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Salon intelligence,{" "}
            <span className="italic font-serif">always organized.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#D0E7E3]">
            Manage salon services, schedule appointments, and keep track of
            every booking — all from one verified staff workspace.
          </p>
        </div>

        {/* Footer note */}
        <div className="relative z-10">
          <p className="text-xs text-[#A3CFC8]">
            © {new Date().getFullYear()} SalonBook. Staff access only.
          </p>
        </div>
      </aside>

      {/* ---------- Right Panel ---------- */}
      <main className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md">
          {/* Verified badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF4F2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#2C7A6E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2C7A6E]" />
              Verified Staff Portal
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your SalonBook workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Institutional email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@salonbook.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
              />
            </div>

            {/* Forgot password */}
            {/* <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-[#2C7A6E]"
              >
                Forgot password?
              </Link>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2C7A6E] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#236258] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in to SalonBook"}
            </button>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          </form>

          {/* Footer link back home */}
          <p className="mt-10 text-center text-xs text-gray-400">
            Not staff?{" "}
            <Link
              href="/"
              className="font-medium text-[#2C7A6E] hover:text-[#236258]"
            >
              Return to homepage
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
