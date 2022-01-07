import { ChangeEvent } from "react";
import { IBullet } from "types";
import { useAppContext } from "hooks/useAppContext";
import { Textarea } from "ui/form/textarea";
import styles from "./bullet.module.scss";

interface IBulletProps {
  bullet: IBullet;
  id: string;
}

export function Bullet({ bullet, id }: IBulletProps) {
  const {
    actions: { updateCreateBullet },
  } = useAppContext();
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    bullet.text = event.target.value;
    bullet.updated = new Date().getTime();

    updateCreateBullet(id, bullet);
  };

  return (
    <div className={styles.bulletContainer}>
      <Textarea
        onChange={handleOnChange}
        autoComplete="off"
        value={bullet.text}
      />
    </div>
  );
}
