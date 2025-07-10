interface TimeSelectProps {
  time: number;
  setTime: (value: number) => void;
}

const timeOptions = [
  { value: 15, label: "Less than 30 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
  { value: 180, label: "More than 2 hours" },
];

export const TimeSelect = ({ time, setTime }: TimeSelectProps) => (
  <div className="w-full flex flex-col gap-2">
    <label htmlFor="time" className="headlineTwo">
      Time Required
    </label>
    <select
      id="time"
      value={time}
      onChange={(e) => setTime(Number(e.target.value))}
      className="input cursor-pointer"
      required
    >
      {timeOptions.map((opt) => (
        <option className="text-brand-black" key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
