import { useAppContext } from "hooks/useAppContext";
import { useState } from "react";
import { createEnemyTemplate } from "utils/create";
import { EnemyTemplateForm } from "./enemyTemplateForm";
import { EnemyTemplateSelect } from './enemyTemplateSelect'

export function CombatEnemyTemplates() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState<string>();
  const {
    state: {
      data: { enemyTemplates },
    },
    actions: { updateCreateEnemyTemplate },
  } = useAppContext();

  const handleCreateNewTemplate = () => {
    setIsDisabled(true);
    const [templateId, newTemplate] = createEnemyTemplate();
    updateCreateEnemyTemplate(templateId, newTemplate);
    setActiveTemplateId(templateId);

    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div>
      <h1>Enemy Templates</h1>
      <div>
        <button onClick={handleCreateNewTemplate} disabled={isDisabled}>
          Create new template
        </button>{" "}
        OR edit template from list{" "}
        <EnemyTemplateSelect
          setActiveTemplateId={setActiveTemplateId}
          activeTemplateId={activeTemplateId}
        />
      </div>

      {activeTemplateId && (
        <EnemyTemplateForm
          templateId={activeTemplateId}
          template={enemyTemplates[activeTemplateId]}
        />
      )}
    </div>
  );
}
