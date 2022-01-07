import { useClickOutside } from "hooks/useClickOutside";
import { Portal } from "modules/portal";
import { ReactNode } from "react";
import { Icon } from "ui/icon";
import styles from "./dialog.module.scss";

interface IDialog {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Dialog({ children, isOpen, onClose }: IDialog) {
  const ref = useClickOutside<HTMLDivElement>(onClose);

  return (
    <Portal isOpen={isOpen}>
      <div className={styles.dialogOverlay}>
        <div ref={ref} className={styles.dialogContainer}>
          <Icon
            onClick={onClose}
            className={styles.dialogCloseIcon}
            name="x"
          />
          {children}
        </div>
      </div>
    </Portal>
  );
}
