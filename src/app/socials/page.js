import { socials } from "@/data/site";

export const metadata = { title: "Socials | Kifaru Esports" };

export default function SocialsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-5xl font-bold uppercase">Socials</h1>
      <p className="mt-3 text-muted">Follow the team and join the community.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {socials.map((s) => {
          const ready = s.href && s.href !== "#";
          const base =
            "flex items-center justify-between rounded-lg border p-5 font-display text-xl uppercase tracking-wide";

          return ready ? (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={`${base} border-line bg-surface transition hover:border-brown hover:text-brown`}
            >
              {s.label} <span>→</span>
            </a>
          ) : (
            <div key={s.label} className={`${base} border-line bg-surface opacity-50`}>
              {s.label}
              <span className="text-xs tracking-widest text-muted">Coming soon</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}