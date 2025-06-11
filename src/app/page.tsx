"use client";

import { AuthContext } from "@/components/contextTypes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../lib/types/recipe";

import { RecipeCard } from "@/components/card";
import { readRecipes, readSortedRecipes } from "./api/recipe/read";
import { getUser } from "./api/auth/user";
import { signInWithGoogle } from "./api/auth/login";
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
    // Fetch 30 min recipes
    readSortedRecipes({ time: 30 }).then((x) => {
      if (x) setTimeRecipes(x ? x.slice(0, 4) : []);
    });
    // Fetch 3 most recent recipes
    readRecipes().then((x) => {
      if (x && x.length > 0) {
        // Sort by created date descending, then take 3
        const sorted = [...x].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRecentRecipes(sorted.slice(0, 4));
      } else {
        setRecentRecipes([]);
      }
      setLoading(false);
    });
    // Only fetch followers' recipes if logged in
    if (profile && profile.following && profile.following.length > 0) {
      const shuffled = [...profile.following].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 1); // pick 1 random following
      if (selected.length > 0) {
        getUser(selected[0]).then((x) => {
          if (x && x.name) setFollowingName(x.name);
        });
        readRecipes().then((allRecipes) => {
          if (allRecipes && allRecipes.length > 0) {
            // Filter recipes by owner_id in selected
            const followingPosts = allRecipes.filter((r) =>
              selected.includes(r.owner_id)
            );
            // Sort by created_at desc and take 3
            const sorted = followingPosts.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
            setFollowerRecipes(sorted.slice(0, 3));
          } else {
            setFollowerRecipes([]);
          }
        });
      }
    } else {
      setFollowerRecipes([]);
    }
  }, [profile]);

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
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
