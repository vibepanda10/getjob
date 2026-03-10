"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const links = [
  ["Home", "/"],
  ["Discover", "/discover"],
  ["Matches", "/matches"],
  ["Profile", "/profile"],
  ["Admin", "/admin"],
];

export function Nav() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-sm">
        <span className="font-semibold tracking-wide text-cyan-300">GET THAT JOB</span>
        <div className="flex items-center gap-4 text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="text-xs text-slate-300">{session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
