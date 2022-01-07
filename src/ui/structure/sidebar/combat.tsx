import { useAppContext } from "hooks/useAppContext";
import { useBattles } from "hooks/useBattles";
import { Link } from "ui/actions/link";
import { createCombat } from "utils/create";
import { MouseEvent } from "react";

const COMBAT_PATH = "/combat/create_combat";

export function Combat() {
  const {
    navigateTo,
    state: {
      activeTabId,
      data: { tabs },
    },
    actions: { updateCreateCombat, setActiveBattle },
  } = useAppContext();
  const { highlightedBattles, battles, archivedBattles } = useBattles();

  const activeTab = tabs[activeTabId];

  const handleCreateCombat = () => {
    const [combatId, combat] = createCombat();
    updateCreateCombat(combatId, combat);
    navigateTo(COMBAT_PATH);
  };

  const handleSetActiveBattle = (event: MouseEvent<HTMLButtonElement>) => {
    // @ts-expect-error
    const topicId = event.target.value;
    setActiveBattle(topicId);
    navigateTo(COMBAT_PATH);
  };

  if (activeTabId !== "Combat") {
    return null;
  }

  return (
    <>
      <Link to="/combat/enemy_templates">Enemy templates</Link>
      <button onClick={handleCreateCombat}>
        {activeTab.sidebarActionName}
      </button>
      <div>
        <hr />
        {highlightedBattles.length ? (
          <>
            <small>Marked as active</small>
            {highlightedBattles.map(([topicId, topic]) => (
              <button
                key={topicId}
                value={topicId}
                onClick={handleSetActiveBattle}
              >
                {topic.name}
              </button>
            ))}
            <hr />
          </>
        ) : null}

        {highlightedBattles.length || archivedBattles.length ? (
          <small>Unmarked</small>
        ) : null}
        {battles.map(([topicId, topic]) => (
          <button key={topicId} value={topicId} onClick={handleSetActiveBattle}>
            {topic.name}
          </button>
        ))}

        {archivedBattles.length ? (
          <>
            <hr />
            <small>Marked as archieved</small>
            {archivedBattles.map(([topicId, topic]) => (
              <button
                key={topicId}
                value={topicId}
                onClick={handleSetActiveBattle}
              >
                {topic.name}
              </button>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
