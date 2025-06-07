import { Link } from "react-router";
export const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Link to={"/profile"}>Go to profile</Link>
    </div>
  );
};
