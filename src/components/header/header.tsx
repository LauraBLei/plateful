import { getCurrentUser } from "src/helpers/getCurrentUser";
import LoginMenu from "./LoginMenu";
import Logo from "./Logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

export const Header = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="max-w-[1440px] w-full p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      <div className="hidden md:flex w-full justify-between items-center">
        <Logo />
        <SearchBar />
        <NavBar user={currentUser} />
      </div>
      <LoginMenu profile={currentUser} />
    </header>
  );
};
