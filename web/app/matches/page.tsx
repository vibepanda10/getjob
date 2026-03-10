"use client";

import { useState } from "react";

type MatchItem = {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
};

type MessageItem = {
  id: string;
  matchId: string;
  senderId: string;
  body: string;
  createdAt: string;
};

export default function MatchesPage() {
  const [userId, setUserId] = useState("u1");
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [activeMatchId, setActiveMatchId] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("Click refresh to load matches.");

  async function loadMatches(currentUserId: string) {
    const response = await fetch(`/api/matches?userId=${currentUserId}`);
    const payload = (await response.json()) as { items: MatchItem[]; error?: string };

    if (!response.ok) {
      setStatus(payload.error ?? "Failed to load matches");
      setMatches([]);
      return;
    }

    setMatches(payload.items);
    setStatus(`Loaded ${payload.items.length} matches for ${currentUserId}.`);

    if (payload.items.length > 0) {
      const first = payload.items[0].id;
      setActiveMatchId(first);
      await loadMessages(first);
    } else {
      setActiveMatchId("");
      setMessages([]);
    }
  }

  async function loadMessages(matchId: string) {
    if (!matchId) return;
    const response = await fetch(`/api/messages?matchId=${matchId}`);
    const payload = (await response.json()) as { items: MessageItem[]; error?: string };

    if (!response.ok) {
      setStatus(payload.error ?? "Failed to load messages");
      return;
    }

    setMessages(payload.items);
    setStatus("");
  }

  async function selectMatch(matchId: string) {
    setActiveMatchId(matchId);
    await loadMessages(matchId);
  }

  async function onUserChange(nextUser: string) {
    setUserId(nextUser);
    await loadMatches(nextUser);
  }

  async function sendMessage() {
    if (!activeMatchId || !body.trim()) return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        matchId: activeMatchId,
        senderId: userId,
        body,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "Failed to send message");
      return;
    }

    setBody("");
    await loadMessages(activeMatchId);
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[320px_1fr]">
      <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h1 className="mb-3 text-xl font-bold">Matches</h1>
        <label className="text-sm text-slate-300">Demo user</label>
        <select
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-2"
          value={userId}
          onChange={(event) => void onUserChange(event.target.value)}
        >
          <option value="u1">u1</option>
          <option value="u2">u2</option>
        </select>
        <button
          onClick={() => void loadMatches(userId)}
          className="mt-3 w-full rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950"
        >
          Refresh matches
        </button>

        <p className="mt-4 text-xs text-slate-400">Messages auto-delete after 60 days per policy.</p>

        <div className="mt-4 space-y-2">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => void selectMatch(match.id)}
              className={`w-full rounded-lg border p-3 text-left text-sm ${
                activeMatchId === match.id ? "border-cyan-400 bg-slate-800" : "border-slate-700"
              }`}
            >
              <p className="font-semibold">{match.id}</p>
              <p className="text-xs text-slate-400">
                {match.userAId} ↔ {match.userBId}
              </p>
            </button>
          ))}
          {matches.length === 0 ? <p className="text-sm text-slate-400">No matches yet.</p> : null}
        </div>
      </aside>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-3 text-xl font-bold">Chat</h2>
        {status ? <p className="mb-3 text-sm text-cyan-300">{status}</p> : null}

        <div className="mb-4 max-h-[420px] space-y-2 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3">
          {messages.map((message) => (
            <div key={message.id} className="rounded-md border border-slate-800 bg-slate-900 p-2 text-sm">
              <p className="text-xs text-cyan-300">{message.senderId}</p>
              <p>{message.body}</p>
              <p className="text-xs text-slate-500">{new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {messages.length === 0 ? <p className="text-sm text-slate-400">Select a match and start messaging.</p> : null}
        </div>

        <div className="flex gap-2">
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write a message"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 p-2"
          />
          <button onClick={() => void sendMessage()} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
            Send
          </button>
        </div>
      </section>
    </main>
  );
}
