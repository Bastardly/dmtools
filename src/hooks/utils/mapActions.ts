import {
  IState,
  IBullet,
  IPlayerStat,
  IPlayer,
  ITopic,
  ISettings,
  IEnemyTemplate,
  ICombat,
  TabType,
} from "types";
import { initialState } from "hooks/useAppState";

export function mapActions(
  state: IState,
  setState: (newState: IState) => void
) {
  const updateState = <T>(
    dataType: keyof IState["data"],
    targetId: string,
    newData: T
  ) => {
    return setState({
      ...state,
      activeTopics:
        dataType === "topics"
          ? {
              ...state.activeTopics,
              [state.activeTabId]: targetId,
            }
          : state.activeTopics,
      activeCombatId: dataType === "combat" ? targetId : state.activeCombatId,
      data: {
        ...state.data,
        [dataType]: {
          ...state.data[dataType],
          [targetId]: newData,
        },
      },
    });
  };

  const replaceStateData = <T>(dataType: keyof IState["data"], newData: T) => {
    return setState({
      ...state,
      data: {
        ...state.data,
        [dataType]: newData,
      },
    });
  };

  const setActiveTopic = (topicId: string, activeTab?: TabType) => {
    const isValid = state.tabNames.includes(state.activeTabId);

    if (!isValid) return;

    const activeTabId = activeTab || state.activeTabId;

    return setState({
      ...state,
      activeTopics: {
        ...state.activeTopics,
        [activeTabId]: topicId,
      },
      activeTabId,
    });
  };

  const setActiveBattle = (combatId: string) => {
    return setState({
      ...state,
      activeCombatId: combatId,
    });
  };

  const totalReset = () => {
    window.localStorage.clear();
    setState(initialState);
  };

  return {
    setState,
    setActiveTopic,
    setActiveBattle,
    totalReset,
    updateSettings: (newSetting: ISettings) =>
      replaceStateData<ISettings>("settings", newSetting),

    updateCreateCombat: (templateId: string, newCombat: ICombat) =>
      updateState<ICombat>("combat", templateId, newCombat),

    updateCreateEnemyTemplate: (
      templateId: string,
      newTemplate: IEnemyTemplate
    ) => updateState<IEnemyTemplate>("enemyTemplates", templateId, newTemplate),

    updateCreateTopic: (topicId: string, newTopic: ITopic) =>
      updateState<ITopic>("topics", topicId, newTopic),

    updateCreateBullet: (bulletId: string, newBullet: IBullet) =>
      updateState<IBullet>("bullets", bulletId, newBullet),

    updateCreatePlayer: (playerId: string, player: IPlayer) =>
      updateState<IPlayer>("players", playerId, player),

    updateCreatePlayerStat: (playerStatId: string, playerStat: IPlayerStat) =>
      updateState<IPlayerStat>("playerStats", playerStatId, playerStat),
  };
}
