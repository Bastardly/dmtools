import { useAppContext } from "hooks/useAppContext";
import { saveAs } from "file-saver";

export function BackupButton() {
  const { state } = useAppContext();

  const onClick = () => {
    const fileName =
      prompt("What does the master want to call the backup file?") || "backup";
    const json = JSON.stringify(state);
    const url = URL.createObjectURL(new Blob([json]));

    saveAs(url, fileName + ".dmBackup");
  };

  return <button onClick={onClick}>Download backup file</button>;
}
