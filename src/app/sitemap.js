import { siteUrl, players, slugOf } from "@/data/site";

export default function sitemap() {
  const pages = ["", "/roster", "/matches", "/live", "/socials"];
  const playerPages = players.map((p) => `/roster/${slugOf(p)}`);
  return [...pages, ...playerPages].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}