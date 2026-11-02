export const team = {
  name: "Kifaru Esports",
  short: "KFR",
  tagline: "Rising from Nairobi. Built to compete.",
  game: "League of Legends",
  region: "euw", // op.gg region slug
  platform: "euw1", // Riot platform host
  routing: "europe", // Riot account routing
  twitchChannel: "", //
  tournament: "SSA/SLS 2026 Founders Tournament",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Roster", href: "/roster" },
  { label: "Matches", href: "/matches" },
  { label: "Live", href: "/live" },
  { label: "Socials", href: "/socials" },
];

// Replace role / realName as you confirm them
export const players = [
    { name: "LightStarkvic", tag: "EUW", role: "Top/ADC",icon:7213, photo: null, bio: "", links:[] },
    { name: "darthbenzi", tag: "BNZ", role: "Jungle"  ,icon:5083, photo: null, bio: "", links:[]},
    { name: "SAG3LOL", tag: "EUW", role: "Mid" ,icon:3611, photo: null, bio: "", links:[] },
    { name: "WIND HASHIRA", tag: "GFP", role: "ADC"  ,icon:7249, photo: null, bio: "", links:[]},
    { name: "Gitchez", tag: "254", role: "Support" ,icon:7144 , photo: "/players/gitchez.jpg", bio: "", links:[]},
    { name: "UpenDope", tag: "19315", role: "Top Sub" ,icon:539, photo: null, bio: "", links:[]},
  ];

export const matches = [
  {
    opponent: "TBD",
    date: "TBD",
    event: "SSA/SLS 2026 Founders Tournament - Division TBD",
    status: "upcoming", // upcoming | live | finished
    result: "",
  },
];

export const socials = [
  { label: "Discord", href: "https://discord.gg/zayCQkCzW" },
  { label: "Twitch", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

export const opgg = (p) =>
  `https://www.op.gg/lol/summoners/${team.region}/${encodeURIComponent(p.name)}-${p.tag}`;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kifaru-esports.vercel.app";

  export const slugOf = (p) =>
  p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");