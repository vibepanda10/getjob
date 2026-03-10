"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/discover");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">Sign in</h1>
      <p className="mb-3 text-sm text-slate-300">Demo helper: helper@getthatjob.dev / demo1234</p>
      <p className="mb-6 text-sm text-slate-300">Demo admin: admin@getthatjob.dev / admin1234</p>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Password</span>
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          />
        </label>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button type="submit" disabled={loading} className="w-full rounded-full bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
          {loading ? "Signing in..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
