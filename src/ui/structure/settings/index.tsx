import { useAppContext } from "hooks/useAppContext";
import { Backup } from "../backup";
import { DefaultRoll } from "ui/form/defaultRoll";
import { IDiceRollSetting } from "types";
import { Checkbox } from "ui/form/checkbox";

export function Settings() {
  const {
    state: {
      data: { settings },
    },
    actions: { updateSettings, totalReset },
  } = useAppContext();

  const handleInitiativeChange = (newDiceSetting: IDiceRollSetting) => {
    settings.initiative = newDiceSetting;
    updateSettings(settings);
  };

  const handleAttackRollChange = (newDiceSetting: IDiceRollSetting) => {
    settings.attackRoll = newDiceSetting;
    updateSettings(settings);
  };

  const handleChangeInitiativeEachRound = (_id: string, checked: boolean) => {
    settings.rollInitiativeEachRound = checked;
    updateSettings(settings);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure? This will delete everything.")) {
      totalReset();
    }
  };

  return (
    <div>
      <h2>Default rolls</h2>
      <div>
        <DefaultRoll
          header="initiative"
          diceSettings={settings.initiative}
          onChangeDice={handleInitiativeChange}
        />
        <Checkbox
          id="rollInitiative"
          checked={settings.rollInitiativeEachRound}
          onChange={handleChangeInitiativeEachRound}
          label="Roll new initiative on each round"
        />

        <DefaultRoll
          header="attack roll"
          diceSettings={settings.attackRoll}
          onChangeDice={handleAttackRollChange}
        />
      </div>
      <hr />
      <h2>Backup</h2>
      <hr />
      <Backup />
      <h2>Clear all</h2>
      <p>
        This will delete all data. It cannot be undone unless you have created a
        backup file.
      </p>

      <button onClick={handleClearAll}>Clear all data</button>
    </div>
  );
}
