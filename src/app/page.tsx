"use client";

import { AuthContext } from "@/components/contextTypes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { supabase } from "@/supabase";
import {
  fetchTimeRecipes,
  fetchRecentRecipes,
  fetchFollowingRecipes,
} from "@/api/homeFetch";

import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";

const Home = () => {
  const { profile } = useContext(AuthContext);
  const [followerRecipes, setFollowerRecipes] = useState<Recipe[]>([]);
  const [timeRecipes, setTimeRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [followingName, setFollowingName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTimeRecipes().then((x) => setTimeRecipes(x));
    fetchRecentRecipes().then((x) => {
      setRecentRecipes(x);
      setLoading(false);
    });
    fetchFollowingRecipes(profile, setFollowingName).then((recipes) =>
      setFollowerRecipes(recipes)
    );
  }, [profile]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1440px] mb-30 w-full px-2 font-primary flex flex-col gap-5">
      <div>
        {profile ? (
          <div className="flex  min-h-[270px] h-full flex-col md:flex-row text-brand-black dark:text-brand-white">
            <div className="flex-1 flex items-center justify-center rounded-t-md md:rounded-l-md md:rounded-r-none dark:bg-brand-white bg-brand-black h-full px-5 text-center shadow-md min-h-[160px] md:min-h-[270px]">
              <h1 className="text-2xl md:text-5xl font-semibold text-brand-white dark:text-brand-black">
                Welcome {profile.name}
              </h1>
            </div>
            <div className="flex-1 rounded-b-md  md:rounded-r-md md:rounded-l-none p-5 text-2xl text-center items-center justify-center flex flex-col border-1 border-brand-black dark:border-brand-white min-h-[160px] md:min-h-[270px]">
              <p className="font-semibold">Got a recipe you wanna share?</p>
              <Link href={"/create"} className="button text-lg  my-5">
                Add a recipe
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex  max-h-[400px] h-full flex-col md:flex-row text-brand-black dark:text-brand-white">
            <div className="flex-1 rounded-t-md md:rounded-l-md md:rounded-r-none dark:bg-brand-white bg-brand-black h-full px-5 text-center py-10 md:py-20 shadow-md">
              <h1 className="text-2xl md:text-5xl font-semibold text-brand-white dark:text-brand-black">
                Welcome to Plateful!
              </h1>
            </div>
            <div className="flex-1 rounded-b-md md:rounded-r-md md:rounded-l-none p-5 text-2xl text-center items-center justify-center flex flex-col border-1 border-brand-black dark:border-brand-white">
              <p className="font-semibold">Got a recipe you wanna share?</p>
              <button
                onClick={signInWithGoogle}
                className="button text-lg  my-5"
              >
                Sign up now!
              </button>
            </div>
          </div>
        )}
      </div>
      {profile && (
        <section id="follow" className="flex flex-col gap-2">
          <h2 className="headline">
            Recent recipes from {followingName || "following"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
            {followerRecipes.length > 0 ? (
              followerRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  id={recipe.id}
                  title={recipe.name}
                  time={recipe.time}
                  owner={recipe.owner}
                />
              ))
            ) : (
              <p className="col-span-full">
                No recent recipes from your following yet.
              </p>
            )}
          </div>
        </section>
      )}
      <section id="recent" className="flex flex-col gap-2">
        <h2 className="headline">Recent</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
          {recentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              id={recipe.id}
              title={recipe.name}
              time={recipe.time}
              owner={recipe.owner}
            />
          ))}
        </div>
      </section>
      <section id="30min" className="flex flex-col gap-2">
        <h2 className="headline">30 min recipes!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
          {timeRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              id={recipe.id}
              title={recipe.name}
              time={recipe.time}
              owner={recipe.owner}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
