import { useIsActive } from "hooks/useIsActive";
import React, { useState } from "react";
import { Dialog } from "ui/structure/dialog";
import { generateNames } from "utils/nameGenerator";
import styles from "./actions.module.scss";
import { useAppContext } from "hooks/useAppContext";
import { createTopic } from "utils/create";
import { useClassName } from "hooks/useClassName";
import { Icon } from "ui/icon";

interface ICharGenButtonComponent {
  isActive: boolean;
  setInactive: () => void;
}

function CharGenButtonComponent({
  isActive,
  setInactive,
}: ICharGenButtonComponent) {
  const [{ firstNames, lastNames }, setState] = useState(generateNames());
  const [selectedFirstName, setFirstName] = useState("");
  const [selectedLastName, setLastName] = useState("");
  const {
    // Overvej om activeTab skal ligge i state. Det kan give problemer overvej om tabs skal være Record<string, ITab> i stedet med id
    navigateTo,
    actions: { updateCreateTopic, setActiveTopic },
  } = useAppContext();

  const regenerateNames = () => setState(generateNames());
  const fullName = selectedFirstName + " " + selectedLastName;

  const generateNpc = () => {
    const [topicId, topic] = createTopic("NPCs", new Date());
    topic.title = fullName;
    setActiveTopic(topicId, "NPCs");
    updateCreateTopic(topicId, topic);
    navigateTo("/npcs");
    window.requestAnimationFrame(setInactive);
  };

  const hasSelectedName = fullName.length > 1;

  const actionBoxClassNames = useClassName(
    styles.createButtonContainer,
    hasSelectedName && styles.highlighted
  );

  return (
    <Dialog isOpen={isActive} onClose={setInactive}>
      <div className={styles.nameDialogContainer}>
        <div>
          <h1>NPC generator</h1>
        </div>
        <div>
          <p>
            I'm dreadfully sorry for anything silly. But those who are chased by
            dragons don't always have time to name their children properly.
          </p>
          <p>
            But you can always{" "}
            <button onClick={regenerateNames}>Generate new suggestions</button>
          </p>
        </div>

        <div className={styles.nameContainer}>
          <div className="card">
            <div>
              <b>First names</b>
            </div>
            {firstNames.map((name) => (
              <div key={name} className={styles.nameElement}>
                <button onClick={() => setFirstName(name)}>{name}</button>
              </div>
            ))}
          </div>
          <div className="card">
            <div>
              <b>Last names</b>
            </div>
            {lastNames.map((name) => (
              <div key={name} className={styles.nameElement}>
                <button onClick={() => setLastName(name)}>{name}</button>
              </div>
            ))}
          </div>
        </div>
        <div className={actionBoxClassNames}>
          {hasSelectedName ? (
            <>
              <Icon name="chevrons-right" className={styles.iconLeft} />
              <button onClick={generateNpc}>
                <span className="fontColor">Click here to create</span> '
                {fullName.trim()}' <span className="fontColor">as NPC</span>
              </button>
              <Icon name="chevrons-left" className={styles.iconRight} />
            </>
          ) : (
            "Select name to create. You can always change it later."
          )}
        </div>
      </div>
    </Dialog>
  );
}

export function CharGenButton() {
  const { isActive, setActive, setInactive } = useIsActive(false);

  return (
    <>
      <button onClick={setActive}>NPC generator</button>

      {isActive && (
        <CharGenButtonComponent isActive={isActive} setInactive={setInactive} />
      )}
    </>
  );
}
