import styles from "./backup.module.scss";
import { BackupButton } from "ui/structure/backup/backupButton";
import { LoadBackupButton } from "ui/structure/backup/loadBackupButton";

export function Backup() {
  return (
    <div className={styles.backupButtonContainer}>
      <div>
        <BackupButton />
      </div>
      <h3>Import from backup file</h3>
      <LoadBackupButton />
    </div>
  );
}
