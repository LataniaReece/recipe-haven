import { Recipe } from "@/types/recipeTypes";
import Image from "next/image";

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  return (
    <div className="border rounded-3xl shadow-sm hover:shadow-slate-500 hover:cursor-pointer transition duration-100 bg-white flex flex-col h-full">
      {/* Recipe Image */}
      <div className="flex justify-center -mt-10">
        <div className="relative w-40 h-40 rounded-full overflow-hidden">
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
          <a
            href={recipe.recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primaryColor hover:bg-primaryColorLight text-white font-semibold text-sm p-2 rounded-lg transition inline-block text-center"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeListItem;
