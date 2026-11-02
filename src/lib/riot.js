import { team, players } from "@/data/site";
import { getDDragonVersion } from "@/lib/ddragon";

const enc = encodeURIComponent;

function riot(host, path, opts = {}) {
  return fetch(`https://${host}.api.riotgames.com${path}`, {
    headers: { "X-Riot-Token": process.env.RIOT_API_KEY },
    ...opts,
  });
}

async function getPuuid(p) {
  const res = await riot(
    team.routing,
    `/riot/account/v1/accounts/by-riot-id/${enc(p.name)}/${enc(p.tag)}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  return (await res.json()).puuid;
}

async function getChampions(version) {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
    { next: { revalidate: 86400 } }
  );
  const json = await res.json();
  const map = {};
  for (const c of Object.values(json.data)) {
    map[Number(c.key)] = { name: c.name, id: c.id };
  }
  return map;
}

export async function getLiveStatus() {
  const version = await getDDragonVersion();
  const champs = await getChampions(version);

  const results = await Promise.all(
    players.map(async (p) => {
      const base = { name: p.name, tag: p.tag, inGame: false, rank: null };
      try {
        const puuid = await getPuuid(p);
        if (!puuid) return { ...base, error: 404 };

        const rank = await getRank(puuid);
        const withRank = { ...base, rank };

        const res = await riot(
          team.platform,
          `/lol/spectator/v5/active-games/by-summoner/${puuid}`,
          { cache: "no-store" }
        );
        if (res.status === 404) return withRank;
        if (!res.ok) return { ...withRank, error: res.status };

        const g = await res.json();
        const me = g.participants.find((x) => x.puuid === puuid);
        const champ = champs[me?.championId];

        return {
          ...withRank,
          inGame: true,
          gameId: g.gameId,
          mode: g.gameMode,
          queueId: g.gameQueueConfigId,
          startTime: g.gameStartTime,
          side: me?.teamId === 100 ? "Blue side" : "Red side",
          champion: champ?.name ?? "Unknown",
          championIcon: champ?.id ?? null,
        };
      } catch {
        return { ...base, error: 500 };
      }
    })
  );

  return { version, players: results };
}

export async function getTopMastery(p, count = 3) {
  try {
    const puuid = await getPuuid(p);
    if (!puuid) return [];

    const res = await riot(
      team.platform,
      `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const list = await res.json();
    const version = await getDDragonVersion();
    const champs = await getChampions(version);

    return list.map((m) => ({
      name: champs[m.championId]?.name ?? "Unknown",
      icon: champs[m.championId]?.id ?? null,
      level: m.championLevel,
      points: m.championPoints,
      version,
    }));
  } catch {
    return [];
  }
}

export async function getRank(puuid) {
  try {
    const res = await riot(team.platform, `/lol/league/v4/entries/by-puuid/${puuid}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const entries = await res.json();
    const e = entries.find((x) => x.queueType === "RANKED_SOLO_5x5");
    if (!e) return null;

    const apex = ["MASTER", "GRANDMASTER", "CHALLENGER"].includes(e.tier);
    const tier = e.tier[0] + e.tier.slice(1).toLowerCase();
    const games = e.wins + e.losses;

    return {
      label: apex ? tier : `${tier} ${e.rank}`,
      lp: e.leaguePoints,
      wins: e.wins,
      losses: e.losses,
      wr: games ? Math.round((e.wins / games) * 100) : 0,
    };
  } catch {
    return null;
  }
}

export async function getPlayerRank(p) {
  const puuid = await getPuuid(p);
  return puuid ? getRank(puuid) : null;
}