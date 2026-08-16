export const prerender = false;

import type { APIRoute } from 'astro';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING = 'https://api.spotify.com/v1/me/player/currently-playing';

function creds() {
  return {
    id: import.meta.env.SPOTIFY_CLIENT_ID ?? process.env.SPOTIFY_CLIENT_ID,
    secret: import.meta.env.SPOTIFY_CLIENT_SECRET ?? process.env.SPOTIFY_CLIENT_SECRET,
    refresh: import.meta.env.SPOTIFY_REFRESH_TOKEN ?? process.env.SPOTIFY_REFRESH_TOKEN,
  };
}

async function getAccessToken(): Promise<string> {
  const { id, secret, refresh } = creds();
  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh! }),
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return (await res.json()).access_token as string;
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

// Only reports a track when something is *actively* playing. When nothing is
// playing, returns { isPlaying: false } and the widget fades away.
export const GET: APIRoute = async () => {
  try {
    const token = await getAccessToken();
    const res = await fetch(NOW_PLAYING, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 200) {
      const d = await res.json();
      if (d?.is_playing && d.item) {
        return json({
          isPlaying: true,
          track: d.item.name,
          artist: d.item.artists.map((a: any) => a.name).join(', '),
          albumArt: d.item.album?.images?.[0]?.url ?? '',
        });
      }
    }
    return json({ isPlaying: false });
  } catch {
    return json({ isPlaying: false });
  }
};
