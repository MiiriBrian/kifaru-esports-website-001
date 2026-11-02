import { team, matches } from "@/data/site";

export const metadata = { title: "Matches | Kifaru Esports" };

const badge = {
  live: "bg-red-600 text-white",
  upcoming: "bg-olive text-cream",
  finished: "bg-line text-muted",
};

function MatchRow({ m }) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg border border-line bg-surface p-5 md:flex-row md:items-center">
      <div>
        <p className="font-display text-2xl uppercase">
          {team.short} <span className="text-muted">vs</span> {m.opponent}
        </p>
        <p className="text-sm text-muted">{m.event}</p>
      </div>
      <div className="flex items-center gap-4">
        {m.result && <span className="font-display text-xl text-tan">{m.result}</span>}
        <span className="text-sm text-muted">{m.date}</span>
        <span
          className={`rounded px-3 py-1 font-display text-xs uppercase tracking-widest ${badge[m.status]}`}
        >
          {m.status}
        </span>
      </div>
    </div>
  );
}

function Group({ title, items }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl uppercase tracking-widest text-tan">{title}</h2>
      <div className="mt-3 space-y-3">
        {items.map((m, i) => (
          <MatchRow key={i} m={m} />
        ))}
      </div>
    </div>
  );
}

export default function MatchesPage() {
  const by = (s) => matches.filter((m) => m.status === s);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-5xl font-bold uppercase">Matches</h1>
      <p className="mt-3 text-muted">Live games, upcoming fixtures and results.</p>

      <Group title="Live Now" items={by("live")} />
      <Group title="Upcoming" items={by("upcoming")} />
      <Group title="Results" items={by("finished")} />

      {matches.length === 0 && (
        <p className="mt-10 text-muted">No matches scheduled yet.</p>
      )}
    </section>
  );
}