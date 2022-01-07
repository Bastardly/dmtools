import { useAppContext } from "hooks/useAppContext";
import { ReactNode } from "react";

interface ILink {
  to: string;
  className?: string;
  children: ReactNode;
}
export function Link({ to, className, children }: ILink) {
    const {
        navigateTo
    } = useAppContext()

  const onClick = (e: Event) => {
    e.preventDefault();
    navigateTo(to);
  };

  return (
    //  @ts-ignore
    <a onClick={onClick} href={to} className={className}>
      {children}
    </a>
  );
}