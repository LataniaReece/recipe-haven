"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";
import FavoriteRecipesList from "@/components/FavoriteRecipes/FavoriteRecipesList";
import Loading from "@/components/Loading";

const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const { favorites, isLoading: isLoadingFavorites } = useFavorites();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-backgroundColor text-center p-6">
        <h2 className="text-2xl font-bold text-primaryColor mb-4">
          Sign In to Add Favorites
        </h2>
        <p className="text-gray-700 mb-6">
          You need to sign in to save and view your favorite recipes.
        </p>
        <Link
          href="/signin"
          className="bg-primaryColor text-white py-2 px-4 rounded-lg hover:bg-primaryColorLight transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoadingFavorites) {
    return <Loading text="Loading favorites..." />;
  }

  return (
    <div className="h-full bg-backgroundColor p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-textColor mb-2 md:mb-0">
          {`My favorites (${favorites.length})`}
        </h2>
        <Link
          href="/"
          className="border-primaryColor border text-primaryColor py-2 px-4 rounded-lg hover:bg-primaryColor hover:text-white transition"
        >
          Explore Recipes
        </Link>
      </div>
      {favorites && favorites.length > 0 ? (
        <FavoriteRecipesList favoriteRecipes={favorites} />
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            You have not added any favorites yet. Explore recipes and start
            saving your favorites!
          </p>
          <Link
            href="/"
            className="bg-secondaryColorDark text-white py-2 px-4 rounded-lg hover:bg-secondaryColorDark transition"
          >
            Explore Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
