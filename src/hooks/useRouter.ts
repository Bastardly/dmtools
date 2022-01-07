import { useEffect, useState } from "react";

import { IRoute } from "types";

export interface IUseRouter<T extends string> {
  tabNames: T[];
  initialPath: T;
}

export interface IUseRouterReturnType<T extends string> {
  routes: IRoute<T>[];
  navigateTo: (path: string) => void;
  activeRoute: string;
}

export const getPath = (name?: string) =>
  "/" + (name || "").toLowerCase().replace(/\s+/g, "_");

/**
 * I seperate router in case I need to seperate routes from tabs
 */
export function useRouter<T extends string>({
  tabNames,
  initialPath,
}: IUseRouter<T>): IUseRouterReturnType<T> {
  const [activeRoute, setActiveRoute] = useState(getPath(initialPath));
  const navigateTo = (url: string) => {
    window.history.pushState({}, document.title, window.location.origin + url);
    setActiveRoute(window.location.pathname);
  };

  const handleNavigation = () => {
    setActiveRoute(window.location.pathname);
  };

  // eslint-disable-next-line
  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== "/") {
      setActiveRoute(pathname);
    } else if (initialPath) {
      navigateTo(getPath(initialPath));
    }
  });

  useEffect(() => {
    window.addEventListener("popstate", handleNavigation);

    return () => window.removeEventListener("popstate", handleNavigation);
  });

  const routes = tabNames.map((name) => {
    const path = getPath(name);
    const isActive = path === activeRoute;

    const route: IRoute<T> = {
      name,
      path,
      isActive,
    };

    return route;
  });

  return {
    routes,
    navigateTo,
    activeRoute,
  };
}
