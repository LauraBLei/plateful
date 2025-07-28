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
        <input
          type="number"
          min={1}
          max={12}
          value={portion}
          onChange={handleChange}
          className="input w-16 text-center font-bold"
        />
      </div>
    </div>
  );
};
