import { cards } from "@/lib/mock-data";

export default function DiscoverPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Discovery</h1>
      <p className="mb-8 text-slate-300">
        Public anonymity is enabled. Identity details unlock only after a mutual match.
      </p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="mb-2 text-xs uppercase tracking-wide text-cyan-300">{card.role}</p>
            <h2 className="text-lg font-semibold">{card.anonymousName}</h2>
            <p className="mt-2 text-sm text-slate-300">{card.headline}</p>
            <p className="mt-2 text-sm text-slate-400">Focus: {card.companyFocus}</p>
            <p className="mt-3 text-sm">{card.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button className="rounded-full border border-rose-400 px-4 py-2 text-sm font-medium text-rose-300">Pass</button>
              <button className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Interested</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
