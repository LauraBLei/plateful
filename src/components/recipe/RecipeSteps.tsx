"use client";
import React, { useEffect, useState } from "react";

interface RecipeStepsProps {
  steps: string[];
}

export const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedSteps(Array(steps.length).fill(false));
  }, [steps]);

  const handleStepCheck = (index: number) => {
    setCheckedSteps((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-5 py-2">
      <h3 className="headlineTwo">How to do it!</h3>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4 py-1 min-h-[32px]">
          <input
            type="checkbox"
            id={`step-checkbox-${i}`}
            className={`shrink-0 cursor-pointer w-5 h-5 rounded-md border-2 border-brand-orange appearance-none transition-colors duration-200 ${
              checkedSteps[i] ? "bg-brand-orange" : "bg-transparent"
            }`}
            checked={checkedSteps[i] || false}
            onChange={() => handleStepCheck(i)}
          />
          <p
            className={
              checkedSteps[i]
                ? "line-through text-brand-black dark:text-brand-white"
                : ""
            }
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};
