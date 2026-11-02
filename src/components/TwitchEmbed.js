"use client";
import { useEffect, useState } from "react";

export default function TwitchEmbed({ channel }) {
  const [host, setHost] = useState(null);
  useEffect(() => setHost(window.location.hostname), []);
  if (!channel || !host) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-line">
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${host}&muted=true`}
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}