"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import RecipeList from "@/components/Recipes/RecipeList";

const FavoritesPage = () => {
  //   const { data: session } = useSession();
  const session = false;
  const [favorites, setFavorites] = useState([]); // Replace with API call to fetch user's favorites

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundColor text-center p-6">
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

  return (
    <div className="min-h-screen bg-backgroundColor p-6">
      <h2 className="text-3xl font-bold text-primaryColor mb-6">
        Your Favorites
      </h2>
      {favorites.length > 0 ? (
        <RecipeList recipes={favorites} />
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            You haven’t added any favorites yet. Explore recipes and start
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
