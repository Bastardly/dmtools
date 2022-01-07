/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { ICombat } from "types";
import { useAppContext } from "./useAppContext";


type IBattleSet = [string, ICombat];

export function useBattles() {
  const {
    state: {
      activeTabId,
      data: { combat },
    },
  } = useAppContext();
  return useMemo(() => {
    const highlightedBattles: IBattleSet[] = [];
    const normalBattles: IBattleSet[] = [];
    const archivedBattles: IBattleSet[] = [];

    const battleSets = Object.entries(combat);   

    battleSets.forEach((battleSet) => {
      const { isActive, isArchieved } = battleSet[1];
      if (isActive) {
        highlightedBattles.push(battleSet);
      } else if (isArchieved) {
        archivedBattles.push(battleSet);
      } else {
        normalBattles.push(battleSet);
      }
    });

    return {
      highlightedBattles,
      battles: normalBattles,
      archivedBattles,
    };
  }, [activeTabId, combat]);
}
