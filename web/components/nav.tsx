import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Discover", "/discover"],
  ["Matches", "/matches"],
  ["Profile", "/profile"],
  ["Admin", "/admin"],
];

export function Nav() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
        <span className="font-semibold tracking-wide text-cyan-300">GET THAT JOB</span>
        <div className="flex gap-4 text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
