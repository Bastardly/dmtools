import { createPortal } from "react-dom";
import { useMemo, ReactNode, createElement } from "react";

const portals = document.getElementById("portals") as HTMLElement;
interface IPortal {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  onClick?: () => void;
}

export const Portal = ({ children, isOpen, className, onClick }: IPortal) => {
  const element = useMemo(() => {
    const el = createElement("div", { className, onClick }, children);
    return el;
  }, [className, onClick, children]);

  if (!isOpen) {
    return null;
  }

  return createPortal(element, portals);
};
