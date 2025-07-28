import React, { useState } from "react";
import { Info } from "lucide-react";

interface InformationTooltipProps {
  text: string;
  className?: string;
}

export const InformationTooltip: React.FC<InformationTooltipProps> = ({
  text,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center  gap-5   ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      aria-label="Information"
      style={{ outline: "none" }}
    >
      {visible && (
        <p className="text-white absolute w-60 z-40 text-sm md:text-base left-10 bg-brand-black p-2 rounded-md border-1 border-brand-orange">
          {text}
        </p>
      )}
      <Info size={18} className="text-brand-orange  cursor-pointer" />
    </div>
  );
};
