import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { RecipeFromDB } from "@/types/recipeTypes";

const FavoriteRecipesList: React.FC<{ favoriteRecipes: RecipeFromDB[] }> = ({
  favoriteRecipes,
}) => {
  const { toggleFavorite } = useFavorites();

  return (
    <div>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} className="py-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="text-xl text-textColorLight font-bold">
              {recipe.label}
            </h3>{" "}
            <button
              onClick={() => toggleFavorite(recipe)}
              className="text-xs cursor-pointer text-red-700 underline hover:no-underline"
            >
              Remove
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            {recipe.mealType && recipe.mealType[0]}
          </p>
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondaryColorDarker underline hover:no-underline"
          >
            See Recipe
          </a>
        </div>
      ))}
    </div>
  );
};
export default FavoriteRecipesList;
