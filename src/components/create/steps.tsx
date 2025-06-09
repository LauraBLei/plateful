import { useEffect, useState } from "react";
import { TextCounter } from "../textCounter";

interface StepsInputProps {
  steps: string[];
  handleStepChange: (index: number, value: string) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
}

export const StepsInput = ({
  steps,
  handleStepChange,
  addStep,
  removeStep,
}: StepsInputProps) => {
  const [textCounts, setTextCounts] = useState<number[]>(
    steps.map((s) => s.length)
  );

  // Update textCounts when steps change (add/remove)
  useEffect(() => {
    setTextCounts(steps.map((s) => s.length));
  }, [steps]);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="headlineTwo ">Recipe Steps</h2>
      <div className="w-full mb-6 border border-gray-200 p-4 rounded-md space-y-4 bg-brand-black text-brand-white dark:text-brand-black dark:bg-brand-white ">
        {steps.map((step, i) => (
          <div key={i} className="mb-2 flex flex-col  gap-2">
            <label className="whitespace-nowrap" htmlFor={`step-${i}`}>
              Step {i + 1}
            </label>
            <div className="flex gap-5 w-full">
              <div className="w-full">
                <textarea
                  id={`step-${i}`}
                  value={step}
                  onChange={(e) => {
                    handleStepChange(i, e.target.value);
                    setTextCounts((prev) => {
                      const updated = [...prev];
                      updated[i] = e.target.value.length;
                      return updated;
                    });
                  }}
                  className="input2 min-h-[80px]"
                  required
                  maxLength={400}
                />
                <TextCounter
                  count={textCounts[i] || 0}
                  maxCharacters={400}
                  style="text-brand-white dark:text-brand-black"
                />
              </div>
              <button
                type="button"
                onClick={() => removeStep(i)}
                disabled={steps.length === 1}
                className="removeButton"
                aria-label={`Remove step ${i + 1}`}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="createButton hover-effect"
        >
          + Add Step
        </button>
      </div>
    </div>
  );
};
