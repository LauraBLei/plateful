"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchContent, SearchResults } from "@/api/searchApi";
import { Recipe } from "@/types/recipe";
import { UserProfile } from "@/types/user";
import { RecipeCard } from "@/components/card";
import Loader from "@/components/loader";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults({ recipes: [], users: [], query: "" });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchContent(query);
        if (searchResults) {
          setResults(searchResults);
        } else {
          setError("Failed to perform search");
        }
      } catch (err) {
        setError("An error occurred while searching");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] w-full mx-auto p-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black dark:text-brand-white mb-2">
          {query ? `Search Results for "${query}"` : "Search"}
        </h1>
        {query && results && (
          <p className="text-gray-600 dark:text-gray-400">
            Found {results.users.length} user
            {results.users.length !== 1 ? "s" : ""} and {results.recipes.length}{" "}
            recipe{results.recipes.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <SearchIcon size={64} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Start Your Search
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a search term in the search bar above to find recipes and
              users
            </p>
          </div>
        </div>
      ) : results ? (
        <div className="space-y-12">
          {/* Users Section */}
          {results.users.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-brand-black dark:text-brand-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Users ({results.users.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.users.map((user: UserProfile) => (
                  <Link
                    key={user.id}
                    href={`/profile?id=${user.id}`}
                    className="group block p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-brand-orange dark:hover:border-brand-orange transition-all duration-200 bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-brand-orange transition-colors">
                        <Image
                          fill
                          src={user.avatar || "/default.jpg"}
                          alt={user.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-black dark:text-brand-white truncate group-hover:text-brand-orange transition-colors">
                          {user.name}
                        </h3>
                        {user.bio && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recipes Section */}
          {results.recipes.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-brand-black dark:text-brand-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Recipes ({results.recipes.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.recipes.map((recipe: Recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.name}
                    time={recipe.time}
                    owner={recipe.owner}
                  />
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {results.users.length === 0 && results.recipes.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <SearchIcon size={64} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No Results Found
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We couldn&apos;t find any users or recipes matching &quot;
                  {query}&quot;. Try a different search term.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

const Search = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
