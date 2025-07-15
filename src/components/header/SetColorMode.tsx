import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";
import { CommonContext } from "src/providers/contextTypes";

const SetColorMode: React.FC = () => {
  const { darkMode, toggleDarkMode } = useContext(CommonContext);

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? (
        <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
          <Moon />
          <span>Dark Mode</span>
        </div>
      ) : (
        <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
          <Sun />
          <span>Light Mode</span>
        </div>
      )}
    </button>
  );
};

export default SetColorMode;
