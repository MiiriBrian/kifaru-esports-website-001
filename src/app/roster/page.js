import { team, players, opgg, slugOf } from "@/data/site";
import { getDDragonVersion } from "@/lib/ddragon";
import PlayerAvatar from "@/components/PlayerAvatar";
import Link from "next/link";

export const metadata = { title: "Roster | Kifaru Esports" };

export default async function RosterPage() {
  const version = await getDDragonVersion();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-display text-sm uppercase tracking-[0.4em] text-tan">
        {team.game}
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold uppercase">Roster</h1>
      <p className="mt-3 max-w-xl text-muted">
        The six who carry the {team.name} banner.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((p) => (
          <div
            key={p.name + p.tag}
            className="rounded-lg border border-line bg-surface p-6 transition hover:border-brown"
          >
            <Link href={`/roster/${slugOf(p)}`} className="flex items-center gap-4">
  <PlayerAvatar player={p} version={version} size={72} />
  <div className="min-w-0">
    <p className="truncate font-display text-2xl uppercase">{p.name}</p>
    <p className="text-sm text-muted">#{p.tag}</p>
  </div>
</Link>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-widest text-slate">
                {p.role}
              </span>
              <a
                href={opgg(p)}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-brown px-3 py-1 font-display text-xs uppercase tracking-widest text-brown transition hover:bg-brown hover:text-bg"
              >
                OP.GG
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}