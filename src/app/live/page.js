import LiveTracker from "@/components/LiveTracker";
import TwitchEmbed from "@/components/TwitchEmbed";
import { team } from "@/data/site";

export const metadata = { title: "Live" };

export default function LivePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-5xl font-bold uppercase">Live</h1>
      <p className="mt-3 mb-10 text-muted">
        See who&apos;s in a game right now and jump in to spectate.
      </p>

      <LiveTracker />

      {team.twitchChannel && (
        <div className="mt-14">
          <h2 className="mb-4 font-display text-2xl uppercase tracking-widest text-tan">
            Stream
          </h2>
          <TwitchEmbed channel={team.twitchChannel} />
        </div>
      )}
    </section>
  );
}