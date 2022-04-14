import { IEnemyTemplate, IEnemy } from "types";
import { Input } from "ui/form/input";
import { Textarea } from "ui/form/textarea";
import { ChangeEvent, useState } from "react";
import { useAppContext } from "hooks/useAppContext";
import { EnemyTemplateSelect } from "../enemyTemplates/enemyTemplateSelect";
import { rollDices } from "utils/dices";
import { getId } from "utils/create";
import { EnemyEdit } from "./enemyEdit";
import { Enemy } from "./enemy";
import styles from "../combat.module.scss";
import { useClassName } from "hooks/useClassName";

function createEnemy(enemyTemplate: IEnemyTemplate): IEnemy {
  return {
    ...enemyTemplate,
    hitpoints: rollDices(enemyTemplate.hitPointSetting),
    id: getId(),
  };
}

function reviveEnemy(enemy: IEnemy): IEnemy {
  return {
    ...enemy,
    hitpoints: rollDices(enemy.hitPointSetting),
  };
}

export function EnemyBattle() {
  const [rollId, setRollId] = useState(-1);
  const [enemyEditMode, setEnemyEditMode] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState<string>();
  const {
    state: {
      activeCombatId,
      data: {
        combat,
        enemyTemplates,
        settings: { rollInitiativeEachRound, initiative },
      },
    },
    actions: { updateCreateCombat },
  } = useAppContext();

  const activeCombat = combat[activeCombatId];

  const addEnemy = () => {
    if (!activeTemplateId) return;

    const enemyTemplate = enemyTemplates[activeTemplateId];
    const newEnemy = createEnemy(enemyTemplate);
    activeCombat.enemies.push(newEnemy);
    updateCreateCombat(activeCombatId, activeCombat);
  };

  const reviveAllEnemies = () => {
    if (window.confirm("This will reset all HPs?")) {
      activeCombat.enemies = activeCombat.enemies.map(reviveEnemy);
      updateCreateCombat(activeCombatId, activeCombat);
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === "name") {
      activeCombat.name = value;
    }
    updateCreateCombat(activeCombatId, activeCombat);
  };

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    activeCombat.note = event.target.value;
    updateCreateCombat(activeCombatId, activeCombat);
  };

  const onChangeEnemy = (enemy: IEnemy) => {
    const index = activeCombat.enemies.findIndex(({ id }) => id === enemy.id);
    activeCombat.enemies[index] = enemy;
    activeCombat.enemies.filter(Boolean);
    updateCreateCombat(activeCombatId, activeCombat);
  };

  const onDeleteEnemy = (enemyId: string) => {
    const filtered = activeCombat.enemies.filter(({ id }) => enemyId !== id);

    activeCombat.enemies = filtered;
    updateCreateCombat(activeCombatId, activeCombat);
  };

  const containerHeaderClassNames = useClassName(
    styles.enemyContainer,
    styles.enemyContainerHeader
  );

  const rollNewInitiative = () => {
    activeCombat.enemies = activeCombat.enemies.map((enemy) => ({
      ...enemy,
      initiativeRoll: rollDices({
        ...initiative,
        modifier: enemy.initiativeModifier,
      }),
    }));

    updateCreateCombat(activeCombatId, activeCombat);
  };

  const sortedEnemies = () => {
    const living: IEnemy[] = [];
    const dead: IEnemy[] = [];
    activeCombat.enemies.forEach((enemy) => {
      if (enemy.hitpoints > 0) {
        living.push(enemy);
      } else {
        dead.push(enemy);
      }
    });
    living.sort((a, b) => {
      const A = a.initiativeRoll || 0;
      const B = b.initiativeRoll || 0;

      return B - A;
    });

    return [...living, ...dead];
  };
  if (!activeCombatId) {
    return <div>Please select an item in the side menu</div>;
  }

  return (
    <div>
      <Input
        label="Battle title"
        name="name"
        type="text"
        value={activeCombat.name}
        onChange={handleChange}
        className="block"
      />
      <div className={styles.enemyOptionsContainer}>
        <div>
          <EnemyTemplateSelect
            setActiveTemplateId={setActiveTemplateId}
            activeTemplateId={activeTemplateId}
          />{" "}
          <button
            disabled={!activeTemplateId}
            onClick={addEnemy}
            className="buttonSpaceL"
          >
            Add Enemy
          </button>
        </div>

        <button onClick={() => setEnemyEditMode(!enemyEditMode)}>
          {enemyEditMode ? "Disable edit mode" : "Enable edit mode"}
        </button>
      </div>
      Note:
      <Textarea
        onChange={handleNoteChange}
        autoComplete="off"
        value={activeCombat.note}
      />
      {!enemyEditMode && (
        <div className={styles.enemyOptionsContainer}>
          <div>
            <button
              onClick={() => setRollId(new Date().getTime())}
              className="buttonSpaceR"
            >
              Roll new round
            </button>
            <button
              onClick={rollNewInitiative}
              hidden={rollInitiativeEachRound}
            >
              Roll new initiative
            </button>
          </div>
          <button
            onClick={reviveAllEnemies}
            title="Will reroll all hitpoints for each enemy"
          >
            Revive all enemies
          </button>
        </div>
      )}
      {!enemyEditMode && (
        <div className={containerHeaderClassNames}>
          <span>Name</span>
          <span>Initiative</span>
          <span>Defence/AC</span>
          <span>Attack</span>
          <span>Damage</span>
          <span>Hitpoints</span>
        </div>
      )}
      {sortedEnemies().map((enemy) =>
        enemyEditMode ? (
          <EnemyEdit
            key={enemy.id}
            onChangeEnemy={onChangeEnemy}
            onDeleteEnemy={onDeleteEnemy}
            {...enemy}
          />
        ) : (
          <Enemy
            key={enemy.id}
            rollId={rollId}
            onChangeEnemy={onChangeEnemy}
            onDeleteEnemy={onDeleteEnemy}
            {...enemy}
          />
        )
      )}
    </div>
  );
}
