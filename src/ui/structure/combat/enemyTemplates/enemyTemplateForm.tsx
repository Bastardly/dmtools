import { IEnemyTemplate, IDiceRollSetting } from "types";
import { DefaultRoll } from "ui/form/defaultRoll";
import { Input } from "ui/form/input";
import { Textarea } from "ui/form/textarea";
import { ChangeEvent } from "react";
import { useAppContext } from "hooks/useAppContext";

interface IEnemyTemplateForm {
  templateId: string;
  template: IEnemyTemplate;
}

export function EnemyTemplateForm({
  templateId,
  template,
}: IEnemyTemplateForm) {
  const {
    actions: { updateCreateEnemyTemplate },
  } = useAppContext();
  const handleChange = (name: string, value: string) => {
    if (name === "name") {
      template.name = value;
    } else if (name === "initiativeModifier") {
      template.initiativeModifier = parseInt(value) || 0;
    } else if (name === "attackModifier") {
      template.attackModifier = parseInt(value) || 0;
    }

    updateCreateEnemyTemplate(templateId, template);
  };

  const handleHPChange = (newDiceSetting: IDiceRollSetting) => {
    template.hitPointSetting = newDiceSetting;
    updateCreateEnemyTemplate(templateId, template);
  };

  const handleDamageChange = (newDiceSetting: IDiceRollSetting) => {
    template.damageSetting = newDiceSetting;
    updateCreateEnemyTemplate(templateId, template);
  };

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    template.note = event.target.value;
    updateCreateEnemyTemplate(templateId, template);
  };

  return (
    <div>
      <h3>Edit: {template.name}</h3>
      <Input
        label="Enemy name"
        name="name"
        type="text"
        value={template.name}
        onChange={handleChange}
        className="block"
      />
      <div>
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
          label="Defence/AC"
          name="defence"
          type="number"
          value={template.defence}
          onChange={handleChange}
        />
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
        <label>
          Note:
          <Textarea
            onChange={handleNoteChange}
            autoComplete="off"
            value={template.note}
          />
        </label>
      </div>
    </div>
  );
}
