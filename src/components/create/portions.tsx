import { Minus, Plus } from "lucide-react";
import React from "react";

interface PortionSizeProps {
  portion: number;
  setPortion: React.Dispatch<React.SetStateAction<number>>;
}

export const PortionSize: React.FC<PortionSizeProps> = ({
  portion,
  setPortion,
}) => {
  const handleDecrease = () => {
    setPortion((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setPortion((prev) => Math.min(12, prev + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 1;
    value = Math.max(1, Math.min(12, value));
    setPortion(value);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="headlineTwo">Set Portion Size</p>
      <div className="flex gap-5 w-full">
        <button
          type="button"
          className="px-2 py-1 rounded hover-effect  bg-brand-gray-200 dark:bg-brand-gray-700 text-lg"
          onClick={handleDecrease}
          aria-label="Decrease portion"
          disabled={portion <= 1}
        >
          <Minus />
        </button>
        <input
          type="number"
          min={1}
          max={12}
          value={portion}
          onChange={handleChange}
          className="input w-16 text-center font-bold"
        />
        <button
          type="button"
          className="px-2 py-1 rounded hover-effect bg-brand-gray-200 dark:bg-brand-gray-700 text-lg"
          onClick={handleIncrease}
          aria-label="Increase portion"
          disabled={portion >= 12}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};
