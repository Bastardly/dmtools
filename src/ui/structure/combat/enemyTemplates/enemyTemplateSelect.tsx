import { useAppContext } from "hooks/useAppContext";
import { ChangeEvent } from "react";

interface IEnemyTemplateSelect {
  setActiveTemplateId: (id?: string) => void;
  activeTemplateId?: string;
}

export function EnemyTemplateSelect({
  setActiveTemplateId,
  activeTemplateId,
}: IEnemyTemplateSelect) {
  const {
    state: {
      data: { enemyTemplates },
    },
  } = useAppContext();

  const templateKeys = Object.keys(enemyTemplates).sort((a, b) => {
    const A = enemyTemplates[a].name;
    const B = enemyTemplates[b].name;

    return A.localeCompare(B);
  });

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newId = event.target.value;
    setActiveTemplateId(newId);
  };

  return (
    <select value={activeTemplateId} onChange={handleSelectChange}>
      <option>--</option>
      {templateKeys.map((key) => (
        <option key={key} value={key}>
          {enemyTemplates[key].name}
        </option>
      ))}
    </select>
  );
}
