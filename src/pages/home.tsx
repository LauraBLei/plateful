import { useContext, useEffect } from "react";
import { readRecipes } from "../API/supabase";
import { AuthContext } from "../types/context";
export const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    readRecipes().then((x) => console.log(x));
  }, []);
  return (
    <div>
      <p>Home</p>
    </div>
  );
};
