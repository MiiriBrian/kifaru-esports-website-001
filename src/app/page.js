import Link from "next/link";
import { team, players, matches, slugOf } from "@/data/site";
import PlayerAvatar from "@/components/PlayerAvatar";
import { getDDragonVersion } from "@/lib/ddragon";

export default async function Home() {
  const version = await getDDragonVersion();
  const next = matches.find((m) => m.status !== "finished");
  const [first, ...rest] = team.name.split(" ");

  const stats = [
    { value: players.length, label: "Active Players" },
    { value: "LoL", label: "Discipline" },
    { value: "Nairobi", label: "Home Base" },
    { value: team.short, label: "Team Tag" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-olive opacity-70 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-brown/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1 font-display text-xs uppercase tracking-[0.3em] text-tan">
              <span className="h-2 w-2 rounded-full bg-brown" />
              {team.game} · Nairobi, Kenya
            </span>

            <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.95] md:text-8xl">
              {first}
              <br />
              <span className="text-outline">{rest.join(" ")}</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-muted">{team.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/live"
                className="rounded bg-brown px-6 py-3 font-display uppercase tracking-widest text-bg transition hover:bg-tan"
              >
                Live Tracker
              </Link>
              <Link
                href="/roster"
                className="rounded border border-brown px-6 py-3 font-display uppercase tracking-widest text-brown transition hover:bg-brown hover:text-bg"
              >
                Meet the Roster
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-[26rem] md:w-[26rem]">
            <div className="spin-slow absolute inset-0 rounded-full border border-brown/30" />
            <div className="spin-slow-rev absolute inset-6 rounded-full border border-dashed border-tan/30" />
            <div className="absolute inset-12 rounded-full bg-olive/60 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={`${team.name} logo`}
              className="animate-float relative h-52 w-52 object-contain drop-shadow-[0_0_40px_rgba(177,127,76,0.35)] md:h-72 md:w-72"
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-line bg-surface/70 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-line px-4 md:grid-cols-4 md:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="font-display text-3xl uppercase text-tan">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next match */}
      {next && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-2xl uppercase tracking-widest text-tan">
            {next.status === "live" ? "Live Now" : "Next Match"}
          </h2>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-surface p-6 md:flex-row md:items-center">
            <div>
              <p className="font-display text-3xl uppercase">
                {team.short} <span className="text-muted">vs</span> {next.opponent}
              </p>
              <p className="mt-1 text-sm text-muted">{next.event}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">{next.date}</span>
              <span
                className={`rounded px-3 py-1 font-display text-xs uppercase tracking-widest ${
                  next.status === "live" ? "bg-red-600 text-white" : "bg-olive text-cream"
                }`}
              >
                {next.status}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Squad */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-2xl uppercase tracking-widest text-tan">The Squad</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {players.map((p) => (
            <Link
              key={p.name + p.tag}
              href={`/roster/${slugOf(p)}`}
              className="rounded-lg border border-line bg-surface p-4 text-center transition hover:border-brown"
            >
              <div className="mx-auto w-fit">
                <PlayerAvatar player={p} version={version} size={64} />
              </div>
              <p className="mt-3 truncate font-display uppercase tracking-wide">{p.name}</p>
              <p className="text-xs text-muted">#{p.tag}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate">{p.role}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}