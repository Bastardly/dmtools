import { useBullets } from "hooks/useBullets";
import { Bullet } from "./bullet";
import { useAppContext } from "hooks/useAppContext";
import { createBullet } from "utils/create";
import { useActiveTopic } from "hooks/useActiveTopic";

export function Bullets() {
  const bullets = useBullets();
  const [activeTopicId] = useActiveTopic();
  const {
    actions: { updateCreateBullet },
  } = useAppContext();

  const onAddNewBullet = () => {
    updateCreateBullet(...createBullet(activeTopicId));
  };

  return (
    <div>
      <hr />
      <button onClick={onAddNewBullet}>Add new note</button>

      {bullets.map(([bulletId, bullet]) => (
        <Bullet key={bulletId} id={bulletId} bullet={bullet} />
      ))}
    </div>
  );
}
