"use client";

import { useMemo, useState } from "react";
import { cards } from "@/lib/mock-data";

type SwipeResult = {
  ok: boolean;
  matched: boolean;
  match: { id: string; userAId: string; userBId: string } | null;
};

const demoUsers = [
  { id: "u1", label: "Demo User A (seeker)" },
  { id: "u2", label: "Demo User B (helper)" },
];

export default function DiscoverPage() {
  const [activeUser, setActiveUser] = useState("u1");
  const [status, setStatus] = useState<string>("");

  const cardsWithTargets = useMemo(
    () =>
      cards.map((card, index) => ({
        ...card,
        demoTargetUserId: index % 2 === 0 ? "u2" : "u1",
      })),
    [],
  );

  async function onSwipe(targetUserId: string, action: "INTERESTED" | "PASS") {
    if (activeUser === targetUserId) {
      setStatus("You cannot swipe yourself in demo mode.");
      return;
    }

    const response = await fetch("/api/swipes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fromUserId: activeUser,
        toUserId: targetUserId,
        action,
      }),
    });

    const payload = (await response.json()) as SwipeResult | { error: string };

    if (!response.ok) {
      setStatus((payload as { error: string }).error);
      return;
    }

    if ((payload as SwipeResult).matched) {
      const match = (payload as SwipeResult).match;
      setStatus(`🎉 It's a match! Match ID: ${match?.id}`);
      return;
    }

    setStatus(`Recorded ${action.toLowerCase()} from ${activeUser} to ${targetUserId}.`);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Discovery</h1>
      <p className="mb-6 text-slate-300">Public anonymity is enabled. Identity details unlock only after a mutual match.</p>

      <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <label className="text-sm text-slate-300">Demo acting user</label>
        <select
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-2"
          value={activeUser}
          onChange={(event) => setActiveUser(event.target.value)}
        >
          {demoUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.label} ({user.id})
            </option>
          ))}
        </select>
        <p className="mt-3 text-xs text-slate-400">Tip: swipe as u1, then switch to u2 and swipe back to create a match.</p>
        {status ? <p className="mt-3 text-sm text-cyan-300">{status}</p> : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cardsWithTargets.map((card) => (
          <article key={card.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="mb-2 text-xs uppercase tracking-wide text-cyan-300">{card.role}</p>
            <h2 className="text-lg font-semibold">{card.anonymousName}</h2>
            <p className="mt-2 text-sm text-slate-300">{card.headline}</p>
            <p className="mt-2 text-sm text-slate-400">Focus: {card.companyFocus}</p>
            <p className="mt-3 text-sm">{card.intro}</p>
            <p className="mt-3 text-xs text-slate-500">Demo target user: {card.demoTargetUserId}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => onSwipe(card.demoTargetUserId, "PASS")}
                className="rounded-full border border-rose-400 px-4 py-2 text-sm font-medium text-rose-300"
              >
                Pass
              </button>
              <button
                onClick={() => onSwipe(card.demoTargetUserId, "INTERESTED")}
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Interested
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
