import { Outlet } from "react-router";
import { Header } from "./header";

export const LayOut = () => {
  return (
    <div className="min-h-screen flex flex-col gap-5 transition-colors duration-500 dark:bg-brand-black bg-brand-white">
      <Header />
      <Outlet />
    </div>
  );
};
