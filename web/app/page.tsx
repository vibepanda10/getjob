import Link from "next/link";

const pillars = [
  {
    title: "Find the right helper",
    text: "Seekers discover experienced professionals who can share practical interview and referral guidance.",
  },
  {
    title: "Match before revealing",
    text: "Profiles stay public-anonymous until both sides show interest.",
  },
  {
    title: "Grow with credits",
    text: "First helper post is free. Credits unlock more posting and visibility actions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">GET THAT JOB</p>
        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            A relaxed network where job seekers and helpers actually connect.
          </h1>
          <p className="text-lg text-slate-300">
            Think &ldquo;Tinder for career help&rdquo;: seekers and referrers discover each other, match on interest,
            and start meaningful conversations.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/discover" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">
            Enter Discovery
          </Link>
          <Link href="/profile" className="rounded-full border border-slate-700 px-6 py-3 font-semibold">
            Complete Profile
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-3 text-xl font-semibold">{pillar.title}</h2>
            <p className="text-slate-300">{pillar.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
