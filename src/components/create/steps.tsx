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
}: StepsInputProps) => (
  <div>
    <h2 className="font-semibold mb-2">Recipe Steps</h2>
    {steps.map((step, i) => (
      <div key={i} className="mb-2 flex items-center gap-2">
        <label className="block flex-1" htmlFor={`step-${i}`}>
          Step {i + 1}
        </label>
        <input
          type="text"
          id={`step-${i}`}
          value={step}
          onChange={(e) => handleStepChange(i, e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="button"
          onClick={() => removeStep(i)}
          disabled={steps.length === 1}
          className="text-red-600 hover:text-red-800 disabled:text-gray-400"
          aria-label={`Remove step ${i + 1}`}
        >
          &times;
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addStep}
      className="mt-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      + Add Step
    </button>
  </div>
);
