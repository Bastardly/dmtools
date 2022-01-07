import { useAppContext } from "hooks/useAppContext";
import { useTopics } from "hooks/useTopics";
import { createTopic } from "utils/create";
import { MouseEvent } from "react";
import { CharGenButton } from "ui/actions/charGenButton";

export function Topics() {
  const {
    // Overvej om activeTab skal ligge i state. Det kan give problemer overvej om tabs skal være Record<string, ITab> i stedet med id
    state: {
      activeTabId,
      data: { tabs },
    },
    actions: { updateCreateTopic, setActiveTopic },
  } = useAppContext();
  const { highlightedTopics, topics, archivedTopics } = useTopics({
    dontSort: activeTabId === "Recap",
  });

  const showTopics = ["NPCs", "Places", "Recap", "Plots"].includes(activeTabId);

  const activeTab = tabs[activeTabId];

  const onClick = () => {
    const [topicId, topic] = createTopic(activeTabId, new Date());
    const title = window.prompt(`All ${activeTabId} need a name`);

    if (!title) return;

    topic.title = title;

    return updateCreateTopic(topicId, topic);
  };

  const handleSetActiveTopic = (event: MouseEvent<HTMLButtonElement>) => {
    // @ts-expect-error
    const topicId = event.target.value;
    setActiveTopic(topicId);
  };

  if (!showTopics) return null;

  return (
    <>
      {activeTabId === "NPCs" ? (
        <CharGenButton />
      ) : (
        <button onClick={onClick}>{activeTab.sidebarActionName}</button>
      )}
      <hr />
      {highlightedTopics.length ? (
        <>
          <small>Marked as active</small>
          {highlightedTopics.map(([topicId, topic]) => (
            <button
              key={topicId}
              value={topicId}
              onClick={handleSetActiveTopic}
            >
              {topic.title}
            </button>
          ))}
          <hr />
        </>
      ) : null}

      {highlightedTopics.length || archivedTopics.length ? (
        <small>Unmarked</small>
      ) : null}
      {topics.map(([topicId, topic]) => (
        <button key={topicId} value={topicId} onClick={handleSetActiveTopic}>
          {topic.title}
        </button>
      ))}

      {archivedTopics.length ? (
        <>
          <hr />
          <small>Marked as archieved</small>
          {archivedTopics.map(([topicId, topic]) => (
            <button
              key={topicId}
              value={topicId}
              onClick={handleSetActiveTopic}
            >
              {topic.title}
            </button>
          ))}
        </>
      ) : null}
    </>
  );
}
