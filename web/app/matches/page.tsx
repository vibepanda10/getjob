import { matches } from "@/lib/mock-data";

export default function MatchesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Matches & Messages</h1>
      <p className="mb-8 text-slate-300">Messages auto-delete after 60 days per policy.</p>

      <div className="space-y-4">
        {matches.map((match) => (
          <article key={match.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{match.username}</h2>
              <span className="text-xs text-slate-400">{match.updatedAt}</span>
            </div>
            <p className="mt-2 text-sm text-cyan-300">{match.revealMode}</p>
            <p className="mt-3 text-sm text-slate-300">{match.lastMessage}</p>
            <button className="mt-4 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Open chat</button>
          </article>
        ))}
      </div>
    </main>
  );
}
