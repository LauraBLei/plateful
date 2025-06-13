import { useEffect, useState } from "react";
import {
  CommonContext,
  type ContextProviderProps,
} from "../components/contextTypes";

export const CommonProvider = ({ children }: ContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dark");
      return saved === "true" ? true : false;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <CommonContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </CommonContext.Provider>
  );
};
