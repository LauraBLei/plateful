import { useContext } from "react";
import { AuthContext, CommonContext } from "../types/context";
import { Link } from "react-router";
import { signOut } from "../API/auth/signOut";
import { signInWithGoogle } from "../API/auth/login";
import { LogOut, Moon, Sun, User2 } from "lucide-react";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(CommonContext);
  return (
    <header className="w-full flex justify-between p-2 font-primary text-brand-black dark:text-brand-white font-semibold ">
      <div className="bg-orange-300 p-2 flex justify-center items-center">
        Logo
      </div>
      <nav className="flex  items-center gap-5 ">
        <Link to="/" className="hover-effect dark:hover:text-brand-orange ">
          Home
        </Link>
        <Link to="/" className="hover-effect dark:hover:text-brand-orange">
          All Recipes
        </Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
              <Moon />
              <span>Dark Mode</span>
            </div>
          ) : (
            <div className="flex gap-2 hover-effect dark:hover:text-brand-orange">
              <Sun />
              <span>Light Mode</span>
            </div>
          )}
        </button>
        {user ? (
          <Link
            className="rounded-full overflow-hidden w-[40px] hover-effect"
            to="/profile"
          >
            <img
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.full_name}
            />
          </Link>
        ) : (
          <button onClick={signInWithGoogle}>
            <User2 className="hover-effect hover:text-brand-orange" />
            <span className="sr-only">Sign in</span>
          </button>
        )}
        {user && (
          <button onClick={signOut}>
            <LogOut className="hover-effect hover:text-brand-orange" />
          </button>
        )}
      </nav>
    </header>
  );
};
