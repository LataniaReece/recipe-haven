"use client";

import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { MdError } from "react-icons/md";
import RecipeList from "./RecipeList";
import Loading from "../Loading";

interface InfiniteScrollRecipeListProps {
  apiUrl: string;
  isSearchMode: boolean;
  setIsNoSearchResultsFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InfiniteScrollRecipeList: React.FC<InfiniteScrollRecipeListProps> = ({
  apiUrl,
  isSearchMode,
  setIsNoSearchResultsFound,
}) => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (pageIndex === 0) return apiUrl; // First page
      return previousPageData?._links?.next?.href; // Subsequent pages
    },
    fetcher,
    {
      refreshInterval: 86400000, // Revalidate every 24 hours (24 * 60 * 60 * 1000 ms)
      revalidateFirstPage: false,
    }
  );

  const recipes = data ? data.flatMap((page) => page.hits) : [];
  const nextPageUrl = data?.[data.length - 1]?._links?.next?.href || null;

  // Determine loading states
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && typeof data?.[size - 1] === "undefined");
  const isReachingEnd = !nextPageUrl;

  // Handle no search results
  useEffect(() => {
    if (isSearchMode && !isLoadingInitialData && recipes.length === 0) {
      setIsNoSearchResultsFound(true);
    }
  }, [
    isSearchMode,
    isLoadingInitialData,
    recipes.length,
    setIsNoSearchResultsFound,
  ]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 md:mt-20 text-center">
        <MdError className="text-red-700 text-5xl mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Uh oh, something went wrong!
        </h2>
        <p className="text-red-700 mb-6">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="py-10 mt-10 md:mt-20">
      <RecipeList recipes={recipes} />
      {(isLoadingMore || isValidating) && (
        <div className="mt-4">
          <Loading text="Fetching Recipes..." />
        </div>
      )}
      {!isReachingEnd && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setSize(size + 1)}
            className="px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColorLight transition"
            disabled={isLoadingMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollRecipeList;
