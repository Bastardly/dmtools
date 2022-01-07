import { useMemo } from "react";
import { ITopic } from "types";
import { useAppContext } from "./useAppContext";

interface IUseTopics {
  dontSort: boolean;
}

type ITopicSet = [string, ITopic];

export function useTopics({ dontSort }: IUseTopics) {
  const {
    state: {
      activeTabId,
      data: { topics },
    },
  } = useAppContext();
  return useMemo(() => {
    const highlightedTopics: ITopicSet[] = [];
    const normalTopics: ITopicSet[] = [];
    const archivedTopics: ITopicSet[] = [];

    const topicsForTab = Object.entries(topics).filter(
      ([_, { tabId }]) => tabId === activeTabId
    );

    if (dontSort) {
      return { highlightedTopics, topics: topicsForTab, archivedTopics };
    }

    topicsForTab.forEach((topicSet) => {
      const { isActive, isArchieved } = topicSet[1];
      if (isActive) {
        highlightedTopics.push(topicSet);
      } else if (isArchieved) {
        archivedTopics.push(topicSet);
      } else {
        normalTopics.push(topicSet);
      }
    });

    return {
      highlightedTopics,
      topics: normalTopics,
      archivedTopics,
    };
  }, [activeTabId, topics, dontSort]);
}
