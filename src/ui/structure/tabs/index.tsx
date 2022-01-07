import { ITabRoute } from "types";
import styles from "./tabs.module.scss";
import { Link } from "ui/actions/link";

interface ITabs {
  routes: ITabRoute[];
}

export function Tabs({ routes }: ITabs) {
  return (
    <div className={styles.tabContainer}>
      {routes.map(({ name, isActive, path }) => (
        <Link
          key={name}
          to={path}
          className={isActive ? "isActive" : undefined}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
