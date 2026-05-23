export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Guest has no DB record — represented as null user
export type AuthUser = User | null;

export interface Game {
    number: string;
    name: string;
    date: string;
    platform: string;

    loveRank: Rank;
    difficultyRank: Rank;

    year: string;
    love: string;
    difficulty: string;
    pride: string;
    achievement: string;
    list: string;
    total: string;
}

export type Rank = "S" | "A" | "B" | "C" | "D" | "F";