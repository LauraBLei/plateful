"use client";
import Link from "next/link";
import { useAuth } from "src/providers/AuthProvider";
import { Welcome } from "./Welcome";

export const WelcomeSection = () => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <section>
      {user ? (
        <div className="flex  min-h-[270px] h-full flex-col md:flex-row text-brand-black dark:text-brand-white">
          <Welcome text={`Welcome ${user.name}`} />
          <div className="flex-1 rounded-b-md  md:rounded-r-md md:rounded-l-none p-5 text-2xl text-center items-center justify-center flex flex-col border-1 border-brand-black dark:border-brand-white min-h-[160px] md:min-h-[270px]">
            <p className="font-semibold">Got a recipe you wanna share?</p>
            <Link href={"/create"} className="button text-lg  my-5">
              Add a recipe
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex  max-h-[400px] h-full flex-col md:flex-row text-brand-black dark:text-brand-white">
          <Welcome text={"Welcome to Plateful!"} />
          <div className="flex-1 rounded-b-md md:rounded-r-md md:rounded-l-none p-5 text-2xl text-center items-center justify-center flex flex-col border-1 border-brand-black dark:border-brand-white">
            <p className="font-semibold">Got a recipe you wanna share?</p>
            <button onClick={signInWithGoogle} className="button text-lg  my-5">
              Sign up now!
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
