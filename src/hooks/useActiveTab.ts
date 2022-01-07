import { ITab } from "types";
import { useAppContext } from "./useAppContext";

export function useActiveTab() {
  const {
    state: {
      activeTabId,
      data: { tabs },
    },
  } = useAppContext();

  return [activeTabId, tabs[activeTabId]] as [string, ITab];
}
