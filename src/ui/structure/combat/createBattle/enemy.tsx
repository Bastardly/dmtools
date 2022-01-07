import { IEnemyProps } from "../types";
import styles from "../combat.module.scss";
import { ChangeEvent, useEffect } from "react";
import { useClassName } from "hooks/useClassName";
import { rollDices } from "utils/dices";
import { useAppContext } from "hooks/useAppContext";

interface IEnhancedEnemyProps extends IEnemyProps {
  rollId: number;
}

export function Enemy({
  onChangeEnemy,
  rollId,
  ...template
}: IEnhancedEnemyProps) {
  const {
    state: {
      data: {
        settings: { initiative, attackRoll, rollInitiativeEachRound },
      },
    },
  } = useAppContext();
  const handleHPChange = (event: ChangeEvent<HTMLInputElement>) => {
    template.hitpoints = parseInt(event.target.value) || 0;
    onChangeEnemy(template);
  };

  useEffect(() => {
    if (rollInitiativeEachRound) {
      template.initiativeRoll = rollDices({
        ...initiative,
        modifier: template.initiativeModifier,
      });
    }
    template.attackRoll = rollDices({
      ...attackRoll,
      modifier: template.attackModifier,
    });

    template.damageRoll = rollDices(template.damageSetting);

    onChangeEnemy(template);
    // RollId updates the rolls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollId]);

  const isDead = template.hitpoints <= 0;

  const classNames = useClassName(
    styles.enemyContainer,
    styles.enemyField,
    isDead && styles.enemyDead
  );

  return (
    <div className={classNames}>
      <span>
        {template.name}
        {isDead && " (dead)"}
      </span>
      <span>{template.initiativeRoll || "-"}</span>
      <span>{template.defence || "-"}</span>
      <span>{template.attackRoll || "-"}</span>
      <span>{template.damageRoll || "-"}</span>
      <input
        type="number"
        onChange={handleHPChange}
        value={template.hitpoints}
      />
      <span className={styles.enemyContainerFullSpan}>{template.note}</span>
    </div>
  );
}
