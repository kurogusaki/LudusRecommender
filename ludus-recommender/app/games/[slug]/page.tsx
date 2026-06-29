import prisma from "@/lib/prisma";
import { fromSlug } from "@/lib/slug";
import { notFound } from "next/navigation";
import UserActionPanel from "@/components//ui/UserActionPanel";
import { isLoggedIn } from "@/lib/auth-placeholder";

const RANK_COLORS: Record<string, string> = {
  S: "#f0c040", A: "#c9a84c", B: "#7ec8a4",
  C: "#7aaedc", D: "#b07adc", F: "#dc7a7a",
};

const RANK_LABELS: Record<string, string> = {
  S: "Outstanding", A: "Great", B: "Good",
  C: "Mixed", D: "Poor", F: "Bad",
};

function DifficultySkull({ rank }: { rank: string | null }) {
  const order = ["F", "D", "C", "B", "A", "S"];
  const level = rank ? order.indexOf(rank) + 1 : 0;
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {order.map((_, i) => (
        <span key={i} style={{ fontSize: "1.25rem", opacity: i < level ? 1 : 0.15 }}>
          💀
        </span>
      ))}
    </div>
  );
}

function StatBlock({ label, value, color }: {
  label: string;
  value: string | number | null | undefined;
  color?: string;
}) {
  if (value == null || value === "") return null;
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      padding: "1.25rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
    }}>
      <span style={{
        fontFamily: "var(--font-jersey25)",
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-jersey25)",
        fontSize: "1.5rem",
        color: color ?? "var(--text)",
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  );
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { name, platform } = fromSlug(slug);

  const games = await prisma.game.findMany({
    where: {
        name: { contains: name },
    },
    });

    const game = games.find(
    (g) =>
        g.name.toLowerCase() === name.toLowerCase() &&
        (g.platform ?? "unknown").toLowerCase() === platform.toLowerCase()
    ) ?? null;

  if (!game) notFound();

  const loveColor = game.loveRank ? RANK_COLORS[game.loveRank] : "var(--muted)";
  const diffColor = game.difficultyRank ? RANK_COLORS[game.difficultyRank] : "var(--muted)";

  return (
    <div style={{ padding: "4rem 0", display: "flex", flexDirection: "column", gap: "3rem" }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <section>
        <p style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "0.75rem",
        }}>
          {game.platform ?? "Unknown Platform"} · {game.year ?? game.date ?? "Unknown Year"}
        </p>
        <h1 style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          color: "var(--text)",
          letterSpacing: "0.03em",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}>
          {game.name}
        </h1>

        {/* Love rank badge */}
        {game.loveRank && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "2.5rem",
              color: loveColor,
              textShadow: `0 0 20px ${loveColor}66`,
            }}>
              {game.loveRank}
            </span>
            <span style={{
              fontFamily: "var(--font-jersey25)",
              fontSize: "1rem",
              color: loveColor,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {RANK_LABELS[game.loveRank]}
            </span>
          </div>
        )}
      </section>

      {/* ── Difficulty ─────────────────────────────────────── */}
      {game.difficultyRank && (
        <section style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}>
          <span style={{
            fontFamily: "var(--font-jersey25)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}>
            Difficulty — {game.difficultyRank} · {RANK_LABELS[game.difficultyRank]}
          </span>
          <DifficultySkull rank={game.difficultyRank} />
        </section>
      )}

      {/* ── Score breakdown ────────────────────────────────── */}
      <section>
        <h2 style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "1rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.5rem",
        }}>
          Score Breakdown
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
        }}>
          <StatBlock label="Love" value={game.love} color="var(--gold)" />
          <StatBlock label="Difficulty" value={game.difficulty} color={diffColor} />
          <StatBlock label="Pride" value={game.pride} />
          <StatBlock label="Achievement" value={game.achievement} />
          <StatBlock label="List" value={game.list} />
          <StatBlock label="Total" value={game.total?.toFixed(2)} color="var(--gold)" />
        </div>
      </section>

{/* ── User Actions (Sprint 9 Placeholder) ───────────────── */}
{/* Authentication will determine visibility in Sprint 9 */}

{isLoggedIn && <UserActionPanel gameName={game!.name} />}


      {/* ── Meta ───────────────────────────────────────────── */}
      <section>
        <h2 style={{
          fontFamily: "var(--font-jersey25)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "1rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "0.5rem",
        }}>
          Details
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
        }}>
          <StatBlock label="Platform" value={game.platform} />
          <StatBlock label="Date Completed" value={game.date} />
          <StatBlock label="Year" value={game.year} />
          <StatBlock label="Entry No." value={game.number} />
        </div>
      </section>

    </div>
  );
}