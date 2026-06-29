import CTAButton from "@/components/ui/CTAButton";
import prisma from "@/lib/prisma";
import type { Game } from "@prisma/client";

async function getStats() {
  const totalGames = await prisma.game.count();
  const recentGames = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { name: true, platform: true, total: true, loveRank: true },
  });
  const lastSync = await prisma.syncLog.findFirst({
    orderBy: { ranAt: "desc" },
    select: { ranAt: true, success: true },
  });

  return { totalGames, recentGames, lastSync };
}

export default async function Home() {
  const { totalGames, recentGames, lastSync } = await getStats();

  return (
    <div style={{ padding: "4rem 0", display: "flex", flexDirection: "column", gap: "4rem" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ maxWidth: "48rem" }}>
        <p style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "1rem",
        }}>
          Personal Game Tracker
        </p>
        <h1 style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "var(--text)",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}>
          Your Games.<br />
          <span style={{ color: "var(--accent)" }}>Your Stats.</span><br />
          Your Picks.
        </h1>
        <p style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "1.1rem",
          color: "var(--muted)",
          marginBottom: "2rem",
          lineHeight: 1.8,
          maxWidth: "36rem",
        }}>
          Ludus tracks every game you've played, ranks them by your own scoring system,
          and surfaces recommendations built around your playstyle — not an algorithm's.
        </p>

        <CTAButton href="/games" label="Browse Games Library →" />
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1px",
        background: "var(--border)",
        border: "1px solid var(--border)",
      }}>
        {[
          { label: "Games Tracked", value: totalGames },
          {
            label: "Last Synced",
            value: lastSync
              ? new Date(lastSync.ranAt).toLocaleDateString()
              : "Never",
          },
          {
            label: "Sync Status",
            value: lastSync?.success ? "Healthy" : "Error",
          },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: "var(--surface)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}>
            <span style={{
              fontFamily: "var(--font-ui), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              {label}
            </span>
            <span style={{
              fontFamily: "var(--font-ui), sans-serif",
              fontSize: "2rem",
              color: "var(--accent)",
            }}>
              {value}
            </span>
          </div>
        ))}
      </section>

      {/* ── Recently Added ───────────────────────────────── */}
      <section>
        <h2 style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "1rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.75rem",
        }}>
          Recently Added
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          background: "var(--border)",
        }}>
          {recentGames.map((game: Pick<Game, "name" | "platform" | "total" | "loveRank">) => (
            <div key={game.name} style={{
              background: "var(--surface)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span style={{
                  fontFamily: "var(--font-ui), sans-serif",
                  fontSize: "1.1rem",
                  color: "var(--text)",
                }}>
                  {game.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-ui), sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  {game.platform ?? "Unknown Platform"}
                </span>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                {game.loveRank && (
                  <span style={{
                    fontFamily: "var(--font-ui), sans-serif",
                    fontSize: "1.25rem",
                    color: "var(--accent)",
                  }}>
                    {game.loveRank}
                  </span>
                )}
                {game.total != null && (
                  <span style={{
                    fontFamily: "var(--font-ui), sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                  }}>
                    {game.total.toFixed(2)} pts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <CTAButton href="/games" label="View All Games →" />
        </div>
      </section>

    </div>
  );
}