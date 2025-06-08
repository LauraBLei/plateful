import { useContext, useEffect } from "react";
import { AuthContext } from "../types/context";
import { readRecipes } from "../API/recipe/read";
export const Home = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    readRecipes().then((x) => console.log(x));
  }, []);
  return (
    <div>
      <p>Home</p>
      <p>Welcome {user?.user_metadata.full_name}</p>
    </div>
  );
};
