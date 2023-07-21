export type Region = "na" | "eu" | "ap" | "latam" | "br" | "kr";

export type AccountDetails = {
  puuid: string;
  region: Region;
  account_level: number;
  name: string;
  tag: string;
  card?: {
    small: string;
    large: string;
    wide: string;
    id: string;
  };
  last_update: string;
  last_update_raw: number;
};

export type RankDetails = {
  currenttier: number;
  currenttierpatched: string;
  images: {
    small: string;
    large: string;
    triangle_down: string;
    triangle_up: string;
  };
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number;
  name: string;
  tag: string;
  old: boolean;
};
