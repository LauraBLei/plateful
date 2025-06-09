interface TagSelectProps {
  tag: string;
  setTag: (value: string) => void;
}

export const TagSelect = ({ tag, setTag }: TagSelectProps) => (
  <div className="w-full flex flex-col gap-2">
    <label className="headlineTwo" htmlFor="tag">
      Meal Type
    </label>
    <select
      id="tag"
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      className="input cursor-pointer"
    >
      <option className="text-brand-black" value="breakfast">
        Breakfast
      </option>
      <option className="text-brand-black" value="lunch">
        Lunch
      </option>
      <option className="text-brand-black" value="dinner">
        Dinner
      </option>
      <option className="text-brand-black" value="dessert">
        Dessert
      </option>
    </select>
  </div>
);
