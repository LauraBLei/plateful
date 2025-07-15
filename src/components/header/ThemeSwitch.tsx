"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import useMounted from "src/hooks/useMounted";

const ThemeSwitch = () => {
  const isMounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!isMounted) {
    return <></>;
  }

  return (
    <button onClick={toggleTheme}>
      <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
        {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        <span>{resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}</span>
      </div>
    </button>
  );
};

export default ThemeSwitch;
