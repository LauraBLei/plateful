type ErrorDisplayProps = {
  error: string | null;
  onClear: () => void;
};

export const ErrorDisplay = ({ error, onClear }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <div className="flex justify-between items-center">
        <span>{error}</span>
        <button
          onClick={onClear}
          className="ml-2 font-bold text-red-700 hover:text-red-900"
        >
          ×
        </button>
      </div>
    </div>
  );
};
