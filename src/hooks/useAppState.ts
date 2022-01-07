import { IState, TabType } from "types";
import { useRouter, getPath } from "hooks/useRouter";
import { LOCAL_STORAGE_NAME } from "consts";
import { useLocalStorageState } from "./useLocalStorageState";
import { mapActions } from "hooks/utils/mapActions";
import { useEffect } from "react";
import { tabs } from "hooks/utils/tabs";

export const initialState: IState = {
  tabNames: Object.keys(tabs),
  activeTopics: {},
  data: {
    settings: {
      initiative: {
        numberOfDice: 1,
        sidesOnDice: 20,
      },
      attackRoll: {
        numberOfDice: 1,
        sidesOnDice: 20,
      },
      rollInitiativeEachRound: false,
    },
    topics: {},
    players: {},
    bullets: {},
    playerStats: {},
    enemyTemplates: {},
    combat: {},
    tabs,
  },
} as IState;

export function useAppState() {
  const { state, setState } = useLocalStorageState<IState>(
    LOCAL_STORAGE_NAME,
    initialState
  );
  const { routes, activeRoute, navigateTo } = useRouter<TabType>({
    tabNames: initialState.tabNames,
    initialPath: "Recap",
  });

  useEffect(() => {
    initialState.tabNames.some((name) => {
      const path = getPath(name);
      const isActive = path === activeRoute;
      if (isActive && name !== state.activeTabId) {
        setState({
          ...state,
          activeTabId: name,
        });
      }

      return isActive;
    });
  }, [activeRoute, setState, state]);

  return {
    state,
    actions: mapActions(state, setState),
    routes,
    activeRoute,
    navigateTo,
  };
}
