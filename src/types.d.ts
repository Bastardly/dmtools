import { mapActions } from "hooks/utils/mapActions";
import { tabs, OriginalTabTypes } from "hooks/utils/tabs";
import { IDice } from "utils/dices";

export { OriginalTabTypes };

export interface IDiceRollSetting {
  numberOfDice: number;
  sidesOnDice: IDice;
  modifier?: number;
}
export interface ITab {
  sidebarActionName: string; // Create player
  description: string;
}

export interface IConnection {
  parentTab: TabType;
  parentId: string;
  childTab: TabType;
  childId: string;
}

export interface ITopic {
  tabId: TabType;
  title: string;
  created: number;
  locked: boolean;
  isActive: boolean;
  isArchieved: boolean;
}

export interface IPlayerStat {
  playerId: string;
  text: string;
  value: number;
  type: "gear" | "info" | "valueStat";
}

export interface IPlayer {
  playedBy: string;
  characterName: string;
}

export interface IEnemyTemplate {
  name: string;
  initiativeModifier: number;
  attackModifier: number;
  defence: number;
  hitPointSetting: IDiceRollSetting;
  damageSetting: IDiceRollSetting;
  note: string;
}

export interface IEnemy extends IEnemyTemplate {
  id: string;
  hitpoints: number;
  initiativeRoll?: number;
  attackRoll?: number;
  damageRoll?: number;
}

export interface ICombat {
  name: string;
  note: string;
  enemies: IEnemy[];
  isActive: boolean;
  isArchieved: boolean;
}

export interface IBullet {
  topicId: ITopic["id"];
  sharedWithTopicId?: ITopic["id"];
  text: string;
  created: number;
  updated: number;
  relatedPlayer?: string;
}

export interface ISettings {
  initiative: IDiceRollSetting;
  attackRoll: IDiceRollSetting;
  rollInitiativeEachRound: boolean;
}

export type TabType = keyof typeof tabs;

/**
 * Structure hierarchies
 * state -> players -> playerStats
 * state -> pages -> topics -> bullets
 */
export interface IState {
  tabNames: TabType[];
  activeTopics: Record<TabType, string>;
  activeTabId: TabType;
  activeCombatId: string;
  data: {
    settings: ISettings;
    tabs: Record<string, ITab>;
    enemyTemplates: Record<string, IEnemyTemplate>;
    topics: Record<string, ITopic>;
    players: Record<string, IPlayer>;
    bullets: Record<string, IBullet>;
    playerStats: Record<string, IPlayerStat>;
    combat: Record<string, ICombat>;
  };
}

export interface IRoute<T extends string> {
  name: T;
  path: string;
  isActive: boolean;
}

export type ITabRoute = IRoute<TabType>;

export interface IAppContext {
  state: IState;
  actions: ReturnType<typeof mapActions>;
  routes: ITabRoute[];
  activeRoute: string;
  navigateTo: (path: string) => void;
}
