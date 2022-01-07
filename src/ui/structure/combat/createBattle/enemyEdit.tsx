// Stjæl fra src\ui\structure\combat\enemyTemplates\enemyTemplateForm.tsx

import { IDiceRollSetting } from "types";
import { DefaultRoll } from "ui/form/defaultRoll";
import { Input } from "ui/form/input";
import { Textarea } from "ui/form/textarea";
import { ChangeEvent } from "react";
import styles from "../combat.module.scss";
import { IEnemyProps } from "../types";

export function EnemyEdit({
  onChangeEnemy,
  onDeleteEnemy,
  ...template
}: IEnemyProps) {
  const handleChange = (name: string, value: string) => {
    if (name === "name") {
      template.name = value;
    } else if (name === "initiativeModifier") {
      template.initiativeModifier = parseInt(value) || 0;
    } else if (name === "attackModifier") {
      template.attackModifier = parseInt(value) || 0;
    } else if (name === "defence") {
      template.defence = parseInt(value) || 0;
    }

    onChangeEnemy(template);
  };

  const handleHPChange = (newDiceSetting: IDiceRollSetting) => {
    template.hitPointSetting = newDiceSetting;
    onChangeEnemy(template);
  };

  const handleDamageChange = (newDiceSetting: IDiceRollSetting) => {
    template.damageSetting = newDiceSetting;
    onChangeEnemy(template);
  };

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    template.note = event.target.value;
    onChangeEnemy(template);
  };

  const handleDeleteEnemy = () => onDeleteEnemy(template.id);

  return (
    <div className={styles.enemyEdit}>
      <button onClick={handleDeleteEnemy}>Delete enemy</button>
      <Input
        label="Enemy name"
        name="name"
        type="text"
        value={template.name}
        onChange={handleChange}
      />
      <Input
        label="Initiative modifier"
        name="initiativeModifier"
        type="number"
        value={template.initiativeModifier}
        onChange={handleChange}
      />
      <Input
        label="Attack modifier"
        name="attackModifier"
        type="number"
        value={template.attackModifier}
        onChange={handleChange}
      />
      <Input
        label="Defence / AC"
        name="defence"
        type="number"
        value={template.defence || 13}
        onChange={handleChange}
      />
      <label>
        Note:
        <Textarea
          onChange={handleNoteChange}
          autoComplete="off"
          value={template.note}
          noCard
        />
      </label>
      <div className="flex">
        <DefaultRoll
          header="Hit point roll"
          diceSettings={template.hitPointSetting}
          onChangeDice={handleHPChange}
          showModifier
        />
        <DefaultRoll
          header="Damage roll"
          diceSettings={template.damageSetting}
          onChangeDice={handleDamageChange}
          showModifier
        />
      </div>
    </div>
  );
}
