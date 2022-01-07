import { useAppContext } from "hooks/useAppContext";
import { useState } from "react";
import styles from "./backup.module.scss";

export function LoadBackupButton() {
  const [selectedFile, setSelectedFile] = useState<File>();

  const {
    actions: { setState },
  } = useAppContext();

  const onClick = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsText(selectedFile, "UTF-8");
    reader.onload = (evt) => {
      const res = evt.target?.result;
      if (res && typeof res === "string") {
        try {
          const newState = JSON.parse(res);
          setState(newState);
        } catch {
          alert("File is corrupted");
        }
      } else {
        alert("Invalid file");
      }
    };
  };

  const changeHandler = (event: any) => {
    const file = event.target.files[0];

    if (!file) return;

    const fileType = file.name?.split(".").pop();

    if (fileType !== "dmBackup") {
      return alert("Invalid file type");
    }

    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <p>Loading a new file will erase all current content</p>
      <input
        type="file"
        onChange={changeHandler}
        accept=".dmBackup"
        className={styles.customFileInput}
      />
      {selectedFile && (
        <>
          <p>Press load to replace all current content with: </p>
          <pre>
            <p>Filename: {selectedFile.name}</p>
            <p>Size in bytes: {selectedFile.size}</p>
          </pre>
        </>
      )}

      <button onClick={onClick} hidden={!selectedFile}>
        Load backup
      </button>
    </>
  );
}
