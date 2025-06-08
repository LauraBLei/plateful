interface TimeSelectProps {
  time: number;
  setTime: (value: number) => void;
}

export const TimeSelect = ({ time, setTime }: TimeSelectProps) => (
  <div>
    <label
      htmlFor="time"
      className="block mb-1 font-semibold text-brand-black dark:text-brand-white"
    >
      Time Required
    </label>
    <select
      id="time"
      value={time}
      onChange={(e) => setTime(Number(e.target.value))}
      className="input"
      required
    >
      <option className="text-brand-black" value={30}>
        30 minutes
      </option>
      <option className="text-brand-black" value={60}>
        1 hour
      </option>
      <option className="text-brand-black" value={90}>
        1.5 hours
      </option>
      <option className="text-brand-black" value={120}>
        2 hours
      </option>
      <option className="text-brand-black" value={180}>
        More than 2 hours
      </option>
    </select>
  </div>
);
