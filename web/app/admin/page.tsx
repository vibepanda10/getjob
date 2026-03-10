const reports = [
  { id: "r-12", reason: "Spam offers", status: "Pending" },
  { id: "r-13", reason: "Abusive message", status: "Pending" },
  { id: "r-14", reason: "Fake profile", status: "Resolved" },
];

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Admin Center</h1>
      <p className="mb-8 text-slate-300">Moderation queue, safety controls, and activity analytics will live here.</p>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent reports</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div>
                <p className="font-medium">{report.id}</p>
                <p className="text-sm text-slate-400">{report.reason}</p>
              </div>
              <span className="rounded-full border border-cyan-400 px-3 py-1 text-xs text-cyan-300">{report.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
