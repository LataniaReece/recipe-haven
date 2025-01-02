export type Recipe = {
  recipe: {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    totalTime: number;
    cuisineType: string[];
    mealType?: string[];
  };
};

export interface RecipeFromDB {
  id: string;
  label: string;
  url: string;
  mealType?: string[];
  source: string;
}
