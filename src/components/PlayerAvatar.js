import { iconUrl } from "@/lib/ddragon";

export default function PlayerAvatar({ player, version, size = 64 }) {
  const box = { width: size, height: size };

  if (player.icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={iconUrl(version, player.icon)}
        alt={player.name}
        style={box}
        className="rounded-full border-2 border-brown object-cover"
      />
    );
  }

  return (
    <div
      style={{ ...box, fontSize: size * 0.4 }}
      className="flex items-center justify-center rounded-full border-2 border-line bg-olive font-display text-tan"
    >
      {player.name[0]}
    </div>
  );
}