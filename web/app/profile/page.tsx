export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Profile Setup</h1>
      <p className="mb-8 text-slate-300">Choose seeker, helper, or both. Resume becomes visible after match only.</p>

      <form className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Display name</span>
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3" placeholder="Seeker-Nova9" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">LinkedIn URL</span>
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3" placeholder="https://linkedin.com/in/your-name" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Role mode</span>
          <select className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3">
            <option>Seeker</option>
            <option>Helper</option>
            <option>Both</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Resume (PDF)</span>
          <input type="file" className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3" />
        </label>

        <button className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950">Save profile</button>
      </form>
    </main>
  );
}
