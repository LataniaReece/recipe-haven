"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MdError } from "react-icons/md";
import { Recipe } from "@/types/recipeTypes";
import RecipeList from "./RecipeList";
import Loading from "../Loading";

interface InfiniteScrollRecipeListProps {
  apiUrl: string;
  activeCategory: string;
  isSearchMode: boolean;
  setIsNoSearchResultsFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfiniteScrollRecipeList: React.FC<InfiniteScrollRecipeListProps> = ({
  apiUrl,
  activeCategory,
  isSearchMode,
  setIsNoSearchResultsFound,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const infiniteScrollTriggerRef = useRef<HTMLDivElement | null>(null);

  const fetchRecipes = useCallback(
    async (url: string) => {
      setIsNoSearchResultsFound(false);
      if (!url) return;

      try {
        setLoading(true);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();

        if (isSearchMode && data.count === 0) {
          setIsNoSearchResultsFound(true);
        }

        setRecipes((prevRecipes) =>
          url === apiUrl ? data.hits : [...prevRecipes, ...data.hits]
        );
        setNextPageUrl(data._links?.next?.href || null);

        setLoading(false);
      } catch (err) {
        setError((err as Error)?.message || "An unknown error occurred");
        setLoading(false);
      }
    },
    [apiUrl, isSearchMode, setIsNoSearchResultsFound]
  );

  // Effect 1: Reset recipes and fetch initial data on category change
  useEffect(() => {
    setRecipes([]);
    setNextPageUrl(apiUrl);
    setInitialFetchDone(false);
    fetchRecipes(apiUrl);
  }, [apiUrl, activeCategory, fetchRecipes]);

  // Effect 2: Update `initialFetchDone` after recipes are updated
  useEffect(() => {
    if (recipes.length > 0) {
      setInitialFetchDone(true);
      setIsNoSearchResultsFound(false);
    }
  }, [recipes, setIsNoSearchResultsFound, isSearchMode]);

  // Effect 3: Infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      // callback
      ([entry]) => {
        if (entry.isIntersecting && nextPageUrl && initialFetchDone) {
          fetchRecipes(nextPageUrl);
        }
      },
      // options
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentElement = infiniteScrollTriggerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [nextPageUrl, fetchRecipes, initialFetchDone]);

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
      {loading && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
      <div ref={infiniteScrollTriggerRef} />
    </div>
  );
};

export default InfiniteScrollRecipeList;
