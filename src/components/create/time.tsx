interface TimeSelectProps {
  time: number;
  setTime: (value: number) => void;
}

export const TimeSelect = ({ time, setTime }: TimeSelectProps) => {
  const hours = Math.floor(Number(time) / 60) || 0;
  const minutes = Number(time) % 60 || 0;
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="time-hours" className="headlineTwo">
        Time Required
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="time-hours"
          type="number"
          min={0}
          max={99}
          value={hours}
          onChange={(e) => {
            const newHours = parseInt(e.target.value, 10) || 0;
            setTime(newHours * 60 + minutes);
          }}
          className="input w-16 text-center"
          placeholder="Hours"
        />
        <span>h</span>
        <input
          id="time-minutes"
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={(e) => {
            const newMinutes = parseInt(e.target.value, 10) || 0;
            setTime(hours * 60 + newMinutes);
          }}
          className="input w-16 text-center"
          placeholder="Minutes"
        />
        <span>min</span>
      </div>
    </div>
  );
};
