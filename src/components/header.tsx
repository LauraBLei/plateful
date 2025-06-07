import { useContext } from "react";
import { AuthContext } from "../types/context";
import { Link } from "react-router";
import { signOut } from "../API/auth/signOut";
import { signInWithGoogle } from "../API/auth/login";

export const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="w-full flex justify-between p-2">
      <div className="bg-orange-300 p-2 flex justify-center items-center">
        Logo
      </div>
      <nav className="flex  items-center gap-5 ">
        <Link to="/">Home</Link>
        <Link to="/">All Recipes</Link>
        <button>Light mode</button>
        {user ? (
          <Link
            className="rounded-full overflow-hidden w-[60px] "
            to="/profile"
          >
            <img
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.full_name}
            />
          </Link>
        ) : (
          <button onClick={signInWithGoogle}>Sign in</button>
        )}
        {user && <button onClick={signOut}>Log Out</button>}
      </nav>
    </header>
  );
};
