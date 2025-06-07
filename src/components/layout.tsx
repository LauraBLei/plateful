import { Outlet } from "react-router";
import { Header } from "./header";

export const LayOut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
