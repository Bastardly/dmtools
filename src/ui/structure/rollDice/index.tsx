import { useState } from "react";

import styles from "./rolldice.module.scss";
import { dices, rollDices, IDice } from "utils/dices";

export function RollDice() {
  const [result, setResult] = useState(20);
  const roll = (sidesOnDice: IDice) =>
    setResult(rollDices({ numberOfDice: 1, sidesOnDice }));

  return (
    <div className={styles.diceContainer}>
      {dices.map((diceSize) => (
        <button key={diceSize} onClick={() => roll(diceSize)}>
          1d{diceSize}
        </button>
      ))}
      <div className={styles.result}>Result: {result}</div>
    </div>
  );
}
