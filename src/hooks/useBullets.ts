import { useMemo } from "react";
import { useAppContext } from "./useAppContext";

export function useBullets() {
  const {
    state: {
      activeTabId,
      activeTopics,
      data: { bullets },
    },
  } = useAppContext();
  const activeTopicId = activeTopics[activeTabId];

  return useMemo(() => {
    return Object.entries(bullets).filter(
      ([_, { topicId }]) => topicId === activeTopicId
    );
  }, [bullets, activeTopicId]);
}
