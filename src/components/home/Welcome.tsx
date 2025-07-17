interface WelcomeProps {
  text: string;
}

export const Welcome: React.FC<WelcomeProps> = ({ text }) => {
  return (
    <div className="flex-1 flex items-center justify-center rounded-t-md md:rounded-l-md md:rounded-r-none dark:bg-brand-white bg-brand-black h-full px-5 text-center shadow-md min-h-[160px] md:min-h-[270px]">
      <h1 className="text-2xl md:text-5xl font-semibold text-brand-white dark:text-brand-black">
        {text}
      </h1>
    </div>
  );
};
