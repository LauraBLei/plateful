"use client";

import Link from "next/link";
import { signInWithGoogle } from "src/api/authActions";

const Welcome = ({ text }) => {
  return (
    <div className="flex-1 flex items-center justify-center rounded-t-md md:rounded-l-md md:rounded-r-none dark:bg-brand-white bg-brand-black h-full px-5 text-center shadow-md min-h-[160px] md:min-h-[270px]">
      <h1 className="text-2xl md:text-5xl font-semibold text-brand-white dark:text-brand-black">
        {text}
      </h1>
    </div>
  );
};

export const WelcomeSection = ({ profile }) => {
  return (
    <section>
      {profile ? (
        <div className="flex  min-h-[270px] h-full flex-col md:flex-row text-brand-black dark:text-brand-white">
          <Welcome text={`Welcome ${profile.name}`} />
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
