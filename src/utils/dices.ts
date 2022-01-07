import { IDiceRollSetting } from "types";
import random from "random";

export type IDice = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export const dices: IDice[] = [4, 6, 8, 10, 12, 20, 100];

export function rollDices({
  numberOfDice,
  sidesOnDice,
  modifier = 0,
}: IDiceRollSetting): number {
  let sum = modifier;

  for (let i = 0; i < numberOfDice; i++) {
    sum += random.int(1, sidesOnDice);
  }

  return sum;
}
