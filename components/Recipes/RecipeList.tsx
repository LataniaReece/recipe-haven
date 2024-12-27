import { Recipe } from "@/types/recipeTypes";
import RecipeListItem from "./RecipeListItem";

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-20 gap-x-8 px-6">
      {recipes.map((recipe: Recipe, index: number) => (
        <RecipeListItem key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
