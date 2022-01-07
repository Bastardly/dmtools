import { useContext, createContext } from "react";
import { IAppContext } from "types";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => useContext<IAppContext>(AppContext);
