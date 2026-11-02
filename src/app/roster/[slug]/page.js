import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { team, players, opgg, slugOf } from "@/data/site";
import { getTopMastery, getPlayerRank } from "@/lib/riot";

async function Rank({ player }) {
  if (!process.env.RIOT_API_KEY) return null;
  const r = await getPlayerRank(player);
  return (
    <span className="rounded border border-line bg-surface px-3 py-1 font-display text-xs uppercase tracking-widest">
      {r ? `${r.label} · ${r.lp} LP · ${r.wr}% WR` : "Unranked"}
    </span>
  );
}

export function generateStaticParams() {
  return players.map((p) => ({ slug: slugOf(p) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = players.find((x) => slugOf(x) === slug);
  return { title: p ? p.name : "Player" };
}

function PlayerPhoto({ player }) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-3 rounded-2xl border border-brown/30" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-brown bg-gradient-to-b from-olive to-bg">
        {player.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.photo}
            alt={player.name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="h-1/2 w-1/2 object-contain opacity-80" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-3xl uppercase leading-none">{player.name}</p>
          <p className="mt-1 font-display text-xs uppercase tracking-widest text-tan">
            {team.short} · {player.role}
          </p>
        </div>

        <span className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-tan" />
        <span className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-tan" />
      </div>
    </div>
  );
}

async function Mastery({ player }) {
  if (!process.env.RIOT_API_KEY) return null;
  const top = await getTopMastery(player, 3);
  if (top.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl uppercase tracking-widest text-tan">
        Best Champions
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {top.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
          >
            {c.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${c.version}/img/champion/${c.icon}.png`}
                alt={c.name}
                className="h-12 w-12 rounded-full border-2 border-brown"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-display uppercase">{c.name}</p>
             <p className="text-xs text-muted">
  {c.points.toLocaleString("en-US")} pts
  <span className="ml-2 rounded bg-olive px-1.5 py-0.5 text-tan">Lv {c.level}</span>
</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlayerPage({ params }) {
  return (
    <Suspense fallback={<p className="px-4 py-16 text-muted">Loading…</p>}>
      <PlayerContent params={params} />
    </Suspense>
  );
}

async function PlayerContent({ params }) {
  const { slug } = await params;
  const p = players.find((x) => slugOf(x) === slug);
  if (!p) notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <Link
        href="/roster"
        className="font-display text-sm uppercase tracking-widest text-muted transition hover:text-brown"
      >
        ← Roster
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-[360px_1fr]">
        <PlayerPhoto player={p} />

        <div>
          <p className="font-display text-sm uppercase tracking-[0.4em] text-tan">
            {team.game}
          </p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase">{p.name}</h1>
          <p className="text-muted">
            Riot ID: {p.name}#{p.tag}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded bg-olive px-3 py-1 font-display text-xs uppercase tracking-widest">
              Preferred role: {p.role}
            </span>
            <a
              href={opgg(p)}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-brown px-3 py-1 font-display text-xs uppercase tracking-widest text-brown transition hover:bg-brown hover:text-bg"
            >
              OP.GG
            </a>
            <Suspense fallback={null}>
  <Rank player={p} />
</Suspense>
          </div>

          {p.bio && <p className="mt-6 max-w-lg text-muted">{p.bio}</p>}

          <Suspense fallback={<p className="mt-10 text-muted">Loading champions…</p>}>
            <Mastery player={p} />
          </Suspense>

          {p.links?.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl uppercase tracking-widest text-tan">
                Links
              </h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-line bg-surface px-4 py-2 font-display text-sm uppercase tracking-widest transition hover:border-brown hover:text-brown"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}