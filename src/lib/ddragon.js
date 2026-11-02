export async function getDDragonVersion() {
  try {
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json", {
      next: { revalidate: 86400 },
    });
    const versions = await res.json();
    return versions[0];
  } catch {
    return "14.24.1";
  }
}

export const iconUrl = (version, id) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`;