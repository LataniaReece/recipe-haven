import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "@/types/recipeTypes";
import { useFavorites } from "@/contexts/FavoritesContext";

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleFavorite({
      id: recipe.recipe.uri,
      label: recipe.recipe.label,
      url: recipe.recipe.url,
      mealType: recipe.recipe.mealType,
      source: recipe.recipe.source,
    });
  };

  return (
    <a
      href={recipe.recipe.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border rounded-3xl shadow-sm hover:shadow-secondaryColorDark hover:cursor-pointer transition duration-100 bg-white flex flex-col h-full relative"
    >
      {/* Heart Icon for Favorites */}
      <div
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 cursor-pointer z-10"
      >
        {isFavorite(recipe.recipe.uri) ? (
          <AiFillHeart className="text-red-500 w-6 h-6" />
        ) : (
          <AiOutlineHeart className="text-gray-400 w-6 h-6 hover:text-red-500" />
        )}
      </div>

      {/* Recipe Image */}
      <div className="flex justify-center -mt-10">
        <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
          <Image
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            fill
            sizes="160px"
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* Recipe Details */}
      <div className="flex flex-col flex-1 text-center px-4">
        <h2 className="text-lg font-semibold text-gray-800 break-words">
          {recipe.recipe.label || ""}
        </h2>
        <p className="text-sm text-gray-500 mt-1 capitalize">
          {recipe.recipe.cuisineType?.[0] || "Cuisine"}
        </p>
      </div>

      {/* Bottom of card */}
      <div className="my-4 border-t border-slate-300">
        <div className="px-3 xl:px-4 pt-3 flex items-center justify-between">
          <div className="text-gray-700 text-sm italic">
            {recipe.recipe.source}
          </div>
          <span className="bg-primaryColorLighter hover:bg-primaryColorLight text-white font-semibold text-sm p-2 rounded-lg transition inline-block text-center">
            View Recipe
          </span>
        </div>
      </div>
    </a>
  );
};

export default RecipeListItem;
