interface TimeSelectProps {
  time: number;
  setTime: (value: number) => void;
}

export const TimeSelect = ({ time, setTime }: TimeSelectProps) => (
  <div>
    <label htmlFor="time" className="block mb-1 font-semibold text-brand-black">
      Time Required
    </label>
    <select
      id="time"
      value={time}
      onChange={(e) => setTime(Number(e.target.value))}
      className="input "
      required
    >
      <option value={30}>30 minutes</option>
      <option value={60}>1 hour</option>
      <option value={90}>1.5 hours</option>
      <option value={120}>2 hours</option>
      <option value={180}>More than 2 hours</option>
    </select>
  </div>
);
