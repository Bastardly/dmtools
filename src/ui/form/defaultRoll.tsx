import { dices, IDice } from "utils/dices";
import { IDiceRollSetting } from "types";
import { ChangeEvent } from "react";
import styles from "./form.module.scss";

interface IDefaultRoll {
  header: string;
  showModifier?: boolean;
  diceSettings: IDiceRollSetting;
  onChangeDice: (dice: IDiceRollSetting) => void;
}

export function DefaultRoll({
  header,
  showModifier,
  diceSettings,
  onChangeDice,
}: IDefaultRoll) {
  const handleChangeNumberOfDices = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 1;
    diceSettings.numberOfDice = value > 0 ? value : 1;
    onChangeDice(diceSettings);
  };

  const handleChangeSidesOfDice = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = (parseInt(event.target.value) || 20) as IDice;
    diceSettings.sidesOnDice = value;
    onChangeDice(diceSettings);
  };

  const handleChangeModifier = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    diceSettings.modifier = value;
    onChangeDice(diceSettings);
  };

  const diceCollection = dices.map((count) => [`${count} sided`, count]);

  return (
    <div className={styles.diceDefaultRoll}>
      <h3>{header}</h3>
      Number of dices{" "}
      <input
        type="number"
        value={diceSettings.numberOfDice}
        onChange={handleChangeNumberOfDices}
      />
      <select
        value={diceSettings.sidesOnDice}
        onChange={handleChangeSidesOfDice}
      >
        {diceCollection.map(([name, value]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      {showModifier && (
        <div>
          Modify by +/-{" "}
          <input
            type="number"
            value={diceSettings.modifier}
            onChange={handleChangeModifier}
          />
        </div>
      )}
    </div>
  );
}
