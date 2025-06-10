interface LanguageSelectProps {
  setLanguage: (lang: string) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  setLanguage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="headlineTwo">What language is the recipe in?</p>
      <select
        className="input w-full"
        required
        defaultValue=""
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="" disabled className="text-brand-black">
          Select language
        </option>
        <option className="text-brand-black" value="english">
          English
        </option>
        <option className="text-brand-black" value="danish">
          Danish
        </option>
        <option className="text-brand-black" value="norwegian">
          Norwegian
        </option>
      </select>
    </div>
  );
};
