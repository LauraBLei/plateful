interface CounterProps {
  count: number;
  maxCharacters: number;
}
/**
 * TextCounter component displays the current character count relative to a maximum limit.
 *
 * Typically used in text input fields or textareas to help users monitor how many characters
 * they’ve typed and how many are allowed.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.count - The current number of characters entered
 * @param {number} props.maxCharacters - The maximum allowed characters
 *
 * @returns {JSX.Element} A right-aligned character counter like "45/150"
 */

export const TextCounter = ({ count, maxCharacters }: CounterProps) => {
  return (
    <div className="whitespace-nowrap flex justify-end px-5 font-primary text-base dark:text-white">
      <span>
        {count} / {maxCharacters}
      </span>
    </div>
  );
};
