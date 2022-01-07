import { useActiveTab } from "hooks/useActiveTab";
import { useActiveTopic } from "hooks/useActiveTopic";
import { useAppContext } from "hooks/useAppContext";
import { ChangeEvent } from "react";
import { Checkbox } from "ui/form/checkbox";
import { Bullets } from "../bullets";

export function TopicContent() {
  const [activeTopicId, activeTopic] = useActiveTopic();
  const [activeTabId, activeTab] = useActiveTab();
  const {
    actions: { updateCreateTopic },
  } = useAppContext();

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    activeTopic.title = event.target.value;
    updateCreateTopic(activeTopicId, activeTopic);
  };

  const handleChangeIsActive = (_id: string, isChecked: boolean) => {
    activeTopic.isActive = isChecked;

    if (activeTopic.isActive && activeTopic.isArchieved) {
      activeTopic.isArchieved = false;
    }

    updateCreateTopic(activeTopicId, activeTopic);
  };

  const handleChangeIsArchieved = (_id: string, isChecked: boolean) => {
    activeTopic.isArchieved = isChecked;

    if (activeTopic.isActive && activeTopic.isArchieved) {
      activeTopic.isActive = false;
    }

    updateCreateTopic(activeTopicId, activeTopic);
  };

  if (!activeTopic) {
    return <div>Please select target to the left</div>;
  }

  return (
    <>
      <div>
        <h1>{activeTabId}</h1>
        <strong>{activeTab.description}</strong>
        <div>
          <label>
            Name{" "}
            <input value={activeTopic.title} onChange={handleChangeTitle} />
          </label>
        </div>
        {activeTabId !== "Recap" && (
          <>
            <Checkbox
              id="makeactive"
              label="Make active"
              onChange={handleChangeIsActive}
              checked={!!activeTopic.isActive}
              style={{ marginRight: "30px" }}
            />
            <Checkbox
              id="sendToArchive"
              label="Send to archieve"
              onChange={handleChangeIsArchieved}
              checked={!!activeTopic.isArchieved}
              style={{ marginRight: "30px" }}
            />
          </>
        )}
      </div>
      <Bullets />
    </>
  );
}
