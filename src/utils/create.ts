import { v4 as getId } from "uuid";
import {
  ITopic,
  IPlayer,
  IPlayerStat,
  IBullet,
  TabType,
  IEnemyTemplate,
  ICombat,
} from "types";

export { getId };

export function createTopic(tabId: TabType, date: Date): [string, ITopic] {
  const now = date.getTime();

  return [
    getId(),
    {
      tabId,
      title: "",
      created: now,
      locked: false,
      isActive: false,
      isArchieved: false,
    },
  ];
}

export const createPlayer = (): [string, IPlayer] => [
  getId(),
  {
    playedBy: "",
    characterName: "",
  },
];

export const createPlayerStat = (
  playerId: string,
  type: IPlayerStat["type"]
): [string, IPlayerStat] => [
  getId(),
  {
    type,
    value: 0,
    text: "",
    playerId,
  },
];

export const createBullet = (topicId: string): [string, IBullet] => {
  const now = new Date().getTime();

  return [
    getId(),
    {
      topicId,
      text: "",
      created: now,
      updated: now,
    },
  ];
};

export const createEnemyTemplate = (): [string, IEnemyTemplate] => {
  return [
    getId(),
    {
      name: "Unnamed",
      initiativeModifier: 0,
      attackModifier: 0,
      defence: 13,
      hitPointSetting: {
        numberOfDice: 1,
        sidesOnDice: 8,
        modifier: 0,
      },
      damageSetting: {
        numberOfDice: 1,
        sidesOnDice: 6,
        modifier: 0,
      },
      note: "",
    },
  ];
};

export const createCombat = (): [string, ICombat] => {
  return [
    getId(),
    {
      name: "",
      note: "",
      enemies: [],
      isActive: false,
      isArchieved: false,
    },
  ];
};
