import { useState } from "react";
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
  const [textCount, setTextCount] = useState<number>(0);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="headlineTwo">Recipe Steps</h2>
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
                  setTextCount(e.target.value.length);
                }}
                className="input min-h-[80px]"
                required
                maxLength={250}
              />
              <TextCounter count={textCount} maxCharacters={250} />
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
  );
};
