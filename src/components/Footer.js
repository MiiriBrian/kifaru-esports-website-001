import { team, socials } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
            <p className="text-sm text-muted">
          © 2026 {team.name}. All rights reserved.
        </p>
           <p className="mx-auto max-w-6xl px-4 pb-6 text-center text-xs text-muted">
  Kifaru Esports isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or
  opinions of Riot Games or anyone officially involved in producing or managing Riot Games
  properties. Riot Games and all associated properties are trademarks or registered
  trademarks of Riot Games, Inc.
</p>
        <div className="flex flex-wrap justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition hover:text-brown"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}