"use client";

import { AuthContext } from "@/components/contextTypes";
import { useContext } from "react";

const Home = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div className="max-w-[1440px] w-full">
      {profile ? <div>logged in</div> : <div>Logged out</div>}
    </div>
  );
};

export default Home;
