import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginMenu from "./LoginMenu";
import Logo from "./logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

export const Header = async () => {
  const supabase = createServerComponentClient(
    { cookies },
    {
      cookieOptions: {
        name: "plateful-auth-token",
        domain:
          process.env.NODE_ENV === "production" ? ".plateful.com" : undefined,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="max-w-[1440px] w-full p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      <div className="hidden md:flex w-full justify-between items-center">
        <Logo />
        <SearchBar />
        <NavBar user={user} />
      </div>
      <LoginMenu user={user} />
    </header>
  );
};
