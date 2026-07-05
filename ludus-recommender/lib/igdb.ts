const CLIENT_ID = process.env.TWITCH_CLIENT_ID!;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!;

  const PLATFORM_MAP: Record<string, string> = {
  "PC (Microsoft Windows)": "PC",
  Linux: "Linux",
  macOS: "macOS",

  "PlayStation 5": "PS5",
  "PlayStation 4": "PS4",
  "PlayStation 3": "PS3",
  "PlayStation 2": "PS2",
  PlayStation: "PS1",

  "Xbox Series X|S": "Xbox Series",
  "Xbox One": "Xbox One",
  "Xbox 360": "Xbox 360",
  Xbox: "Xbox",

  "Nintendo Switch": "Switch",
  "Nintendo Switch 2": "Switch 2",
  Wii: "Wii",
  "Wii U": "Wii U",
  "Nintendo GameCube": "GameCube",

  Steam: "Steam",
  "Steam Deck": "Steam Deck",
};

export async function getAccessToken(): Promise<string> {
  const response = await fetch(
    "https://id.twitch.tv/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OAuth failed: ${response.status}`);
  }

  const data = await response.json();

  return data.access_token;
}

export async function searchGame(
  name: string,
  token: string
) {
  const query = `
search "${name}";
fields
id,
name,
slug,
summary,
cover.image_id,
first_release_date,
genres.name,
platforms.name,
themes.name,
game_modes.name,
keywords.name,
involved_companies.company.name,
involved_companies.developer,
involved_companies.publisher;
limit 1;
`;

  const response = await fetch(
    "https://api.igdb.com/v4/games",
    {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body: query,
    }
  );

  if (!response.ok) {
    throw new Error(`IGDB Error ${response.status}`);
  }

  const games = await response.json();

  return games[0] ?? null;
}

export function getCoverUrl(imageId: string) {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.webp`;
}

export function mapIGDBGame(game: any) {
  return {
    igdbId: game.id,
    slug: game.slug ?? null,
    summary: game.summary ?? null,

    genres: game.genres?.map((g: any) => ({id: g.id,name: g.name,})) ?? [],
    platforms:game.platforms?.map((p: any) => ({id: p.id,name: PLATFORM_MAP[p.name] ?? p.name, })) ?? [],
    themes: game.themes?.map((t: any) => ({id: t.id,name: t.name,})) ?? [],
    gameModes: game.game_modes?.map((m: any) => ({id: m.id,name: m.name,})) ?? [],
    keywords: game.keywords?.map((k: any) => ({id: k.id,name: k.name,})) ?? [],

    developer:
      game.involved_companies?.find((c: any) => c.developer)?.company?.name ??
      null,

    publisher:
      game.involved_companies?.find((c: any) => c.publisher)?.company?.name ??
      null,

    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : null,
  };
}