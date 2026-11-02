import { getLiveStatus } from "@/lib/riot";



const TTL = 45_000;
let cache = { at: 0, body: null };

export async function GET() {
  if (!process.env.RIOT_API_KEY) {
    return Response.json({ configured: false, players: [] });
  }

  if (cache.body && Date.now() - cache.at < TTL) {
    return Response.json(cache.body);
  }

  const { version, players } = await getLiveStatus();
  const keyProblem =
    players.length > 0 && players.every((p) => p.error === 401 || p.error === 403);

  const body = { configured: true, keyProblem, version, updatedAt: Date.now(), players };
  cache = { at: Date.now(), body };

  return Response.json(body, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
  });
}