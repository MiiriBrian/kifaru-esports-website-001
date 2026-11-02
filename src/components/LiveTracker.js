"use client";
import { useEffect, useState } from "react";
import { opgg } from "@/data/site";

const QUEUES = {
  0: "Custom",
  400: "Normal Draft",
  420: "Ranked Solo/Duo",
  430: "Normal Blind",
  440: "Ranked Flex",
  450: "ARAM",
  490: "Quickplay",
  700: "Clash",
  1700: "Arena",
};

const fmt = (s) => {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function LiveTracker() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    let stop = false;
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/live");
        const json = await res.json();
        if (!stop) {
          setData(json);
          setFailed(false);
        }
      } catch {
        if (!stop) setFailed(true);
      }
    };
    setNow(Date.now());
    load();
    const poll = setInterval(load, 60_000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      stop = true;
      clearInterval(poll);
      clearInterval(tick);
    };
  }, []);

  if (failed && !data)
    return <p className="text-muted">Tracker is unreachable right now. Try again shortly.</p>;
  if (!data) return <p className="text-muted">Checking the squad…</p>;
  if (!data.configured)
    return (
      <p className="rounded-lg border border-line bg-surface p-5 text-muted">
        Live tracking isn&apos;t switched on yet. Use the OP.GG links on the Roster page for now.
      </p>
    );
  if (data.keyProblem)
    return (
      <p className="rounded-lg border border-line bg-surface p-5 text-muted">
        Tracker is temporarily offline (API key issue). We&apos;re on it.
      </p>
    );

  const live = data.players.filter((p) => p.inGame);

  // group players sharing the same game
  const groups = {};
  live.forEach((p) => (groups[p.gameId] = [...(groups[p.gameId] || []), p]));
  const stacks = Object.values(groups).filter((g) => g.length >= 2);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${
            live.length ? "animate-pulse bg-red-500" : "bg-line"
          }`}
        />
        <p className="font-display text-xl uppercase tracking-widest">
          {live.length ? `${live.length} of ${data.players.length} in game` : "Nobody in game right now"}
        </p>
      </div>

      {stacks.map((g, i) => (
        <div
          key={i}
          className="mt-4 rounded-lg border border-brown bg-olive/40 p-4 font-display uppercase tracking-widest text-tan"
        >
          Team stack live: {g.length} Kifaru players in the same game
        </div>
      ))}

     <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {data.players.map((p) => {
    const elapsed = p.startTime > 0 && now ? (now - p.startTime) / 1000 : null;
    return (
      <div
        key={p.name + p.tag}
        className={`rounded-lg border bg-surface p-5 ${
          p.inGame ? "border-red-500/70" : "border-line"
        }`}
      >
        <div className="flex items-center gap-4">
          {p.inGame && p.championIcon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${data.version}/img/champion/${p.championIcon}.png`}
              alt={p.champion}
              className="h-14 w-14 rounded-full border-2 border-red-500/70"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-line bg-olive font-display text-xl text-tan">
              {p.name[0]}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-xl uppercase">{p.name}</p>
            <p className="text-xs text-muted">#{p.tag}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          {p.error ? (
            <span className="text-muted">Status unavailable</span>
          ) : p.inGame ? (
            <div>
              <p className="font-display uppercase tracking-wide text-cream">{p.champion}</p>
              <p className="text-xs text-muted">
                {QUEUES[p.queueId] || p.mode} · {p.side} ·{" "}
                {elapsed !== null ? fmt(elapsed) : "Loading screen"}
              </p>
            </div>
          ) : (
            <span className="font-display text-xs uppercase tracking-widest text-muted">
              Not in game
            </span>
          )}

          <a
            href={p.inGame ? `${opgg(p)}/ingame` : opgg(p)}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-brown px-3 py-1 font-display text-xs uppercase tracking-widest text-brown transition hover:bg-brown hover:text-bg"
          >
            {p.inGame ? "Spectate" : "OP.GG"}
          </a>
        </div>

        <div className="mt-4 border-t border-line pt-3 text-xs">
          {p.rank ? (
            <p>
              <span className="font-display uppercase tracking-wide text-tan">
                {p.rank.label}
              </span>{" "}
              · {p.rank.lp} LP · {p.rank.wr}% WR{" "}
              <span className="text-muted">
                ({p.rank.wins}W {p.rank.losses}L)
              </span>
            </p>
          ) : (
            <p className="text-muted">Unranked (Solo/Duo)</p>
          )}
        </div>
      </div>
    );
  })}
</div>

      <p className="mt-4 text-xs text-muted">Refreshes every minute.</p>
    </div>
  );
}