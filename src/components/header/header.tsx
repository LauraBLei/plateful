import LoginMenu from "./LoginMenu";
import Logo from "./logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

export const Header = async () => {
  return (
    <header className="max-w-[1440px] w-full p-2 font-primary flex items-center text-brand-black dark:text-brand-white font-semibold ">
      <Logo />
      <div className="hidden md:flex w-full justify-between items-center">
        <SearchBar />
        <NavBar />
      </div>
      <LoginMenu />
    </header>
  );
};
