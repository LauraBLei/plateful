interface TagSelectProps {
  tag: string;
  setTag: (value: string) => void;
}

export const TagSelect = ({ tag, setTag }: TagSelectProps) => (
  <div>
    <label className="block mb-1 font-semibold" htmlFor="tag">
      Tag / Meal Type
    </label>
    <select
      id="tag"
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="dessert">Dessert</option>
    </select>
  </div>
);
