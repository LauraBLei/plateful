interface TimeSelectProps {
  time: number;
  setTime: (value: number) => void;
}

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
