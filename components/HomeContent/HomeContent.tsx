"use client";

import { Suspense, useState } from "react";
import { Playfair_Display } from "next/font/google";
import CategoriesSearchButtons from "./CategoriesSearchButtons";
import Loading from "../Loading";
import InfiniteScrollRecipeList from "../Recipes/InfiniteScrolleRecipeList";
import SearchRecipe from "./SearchRecipe";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const HomeContent = () => {
  const [activeCategory, setActiveCategory] = useState("easy");
  const [query, setQuery] = useState("");
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  const [searchApiUrl, setSearchApiUrl] = useState<string | null>(null);
  const [isNoSearchResultsFound, setIsNoSearchResultsFound] = useState(false);

  const generateApiUrl = (category: string) => {
    return `${process.env.NEXT_PUBLIC_EDAMAM_API_URL}?type=public&q=${category}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_API_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}`;
  };

  const handleSearch = (query: string) => {
    setIsNoSearchResultsFound(false);
    setLastSearchedQuery(query);
    const searchUrl = generateApiUrl(query);
    setSearchApiUrl(searchUrl);
  };

  const handleClearSearch = () => {
    setSearchApiUrl(null);
    setQuery("");
    setLastSearchedQuery("");
    setIsNoSearchResultsFound(false);
    setActiveCategory("easy");
  };

  return (
    <div className="h-full text-textColor pt-8">
      <SearchRecipe
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        setIsNoSearchResultsFound={setIsNoSearchResultsFound}
        setSearchApiUrl={setSearchApiUrl}
      />

      {/* Title */}
      <h1
        className={`text-textColor text-4xl font-bold ${playfairDisplay.className} px-6`}
      >
        Simple Recipes, Extraordinary Meals
      </h1>

      {/* Display Search Results Info or Categories */}
      {searchApiUrl ? (
        <div className="px-6">
          <div className="mt-4 text-lg italic text-gray-600 mb-1">
            {isNoSearchResultsFound ? (
              <>
                No results found for&nbsp;
                <span className="font-bold text-primaryColor">
                  {lastSearchedQuery}
                </span>
                . Try another search!
              </>
            ) : (
              <>
                Showing results for&nbsp;
                <span className="font-bold text-primaryColor">
                  {lastSearchedQuery}
                </span>
                . Scroll down to see more!
              </>
            )}
          </div>
          <button
            onClick={handleClearSearch}
            className="text-secondaryColorDark underline hover:text-primaryColorDark transition"
          >
            Clear Results
          </button>
        </div>
      ) : (
        <CategoriesSearchButtons
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {/* Infinite Scroll Recipe List */}
      <Suspense fallback={<Loading />}>
        <InfiniteScrollRecipeList
          apiUrl={searchApiUrl || generateApiUrl(activeCategory)}
          activeCategory={activeCategory}
          isSearchMode={!!searchApiUrl}
          setIsNoSearchResultsFound={setIsNoSearchResultsFound}
        />
      </Suspense>
    </div>
  );
};
export default HomeContent;
