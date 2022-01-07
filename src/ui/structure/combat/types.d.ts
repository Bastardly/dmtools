import { IEnemy } from "types";

export interface IEnemyProps extends IEnemy {
  onChangeEnemy: (enemy: IEnemy) => void;
  onDeleteEnemy: (enemyId: string) => void;
}
