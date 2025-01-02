import { useFavorites } from "@/contexts/FavoritesContext";
import { RecipeFromDB } from "@/types/recipeTypes";
import React from "react";

const FavoriteRecipesList: React.FC<{ favoriteRecipes: RecipeFromDB[] }> = ({
  favoriteRecipes,
}) => {
  const { toggleFavorite } = useFavorites();

  return (
    <div>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} className="p-4 border-b">
          <h3 className="text-xl font-bold">{recipe.label}</h3>
          <p className="text-gray-500">
            {recipe.mealType && recipe.mealType[0]}
          </p>
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondaryColor underline"
          >
            See Recipe
          </a>
          <div className="mt-2">
            <button
              onClick={() => toggleFavorite(recipe)}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove from Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FavoriteRecipesList;
