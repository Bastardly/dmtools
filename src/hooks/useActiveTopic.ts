import { ITopic } from "types";
import { useAppContext } from "./useAppContext";

export function useActiveTopic() {
  const {
    state: {
      activeTabId,
      activeTopics,
      data: { topics },
    },
  } = useAppContext();

  const activeTopicId = activeTopics[activeTabId];

  return [activeTopicId, topics[activeTopicId]] as [string, ITopic];
}
