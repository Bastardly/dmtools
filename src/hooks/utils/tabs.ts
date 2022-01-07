import { ITab } from "types";

/**
 * This is what that defines TabTypes
 */
export type OriginalTabTypes =
  | "Recap"
  | "Players"
  | "NPCs"
  | "Plots"
  | "Places"
  | "Combat"
  | "Settings";

export const tabs: Record<OriginalTabTypes, ITab> = {
  Recap: {
    sidebarActionName: "Create session",
    description:
      "What happened during the session?",
  },
  Players: {
    sidebarActionName: "Create player",
    description:
      "Overview of what's important regarding the individual players",
  },
  NPCs: {
    sidebarActionName: "Create NPC",
    description: "How do they talk, how do they look, what are their motives?",
  },
  Plots: {
    sidebarActionName: "Create plot",
    description: "Notes on plots, encounters and incidences regarding the players",
  },
  Places: {
    sidebarActionName: "Create place",
    description: "Notes on that's happening at various locations",
  },
  Combat: {
    sidebarActionName: "Create new battle",
    description:
      "Overview of what's important regarding the individual players",
  },
  Settings: {
    sidebarActionName: "",
    description: "Create or load from a backup file",
  },
};
