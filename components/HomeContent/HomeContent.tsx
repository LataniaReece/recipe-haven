"use client";

import { Suspense, useState } from "react";
import { Playfair_Display } from "next/font/google";
import CategoriesSearchButtons from "./CategoriesSearchButtons";
import Loading from "../Loading";
import InfiniteScrollRecipeList from "../Recipes/InfiniteScrolleRecipeList";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const HomeContent = () => {
  const [activeCategory, setActiveCategory] = useState("easy");

  const generateApiUrl = (category: string) => {
    return `${process.env.NEXT_PUBLIC_EDAMAM_API_URL}?type=public&q=${category}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_API_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}`;
  };

  console.log(activeCategory);

  return (
    <div className="h-full text-textColor pt-8">
      <h1
        className={`text-textColor text-4xl font-bold ${playfairDisplay.className} px-6`}
      >
        Simple Recipes, Extraordinary Meals
      </h1>
      <CategoriesSearchButtons
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Suspense fallback={<Loading />}>
        <InfiniteScrollRecipeList
          apiUrl={generateApiUrl(activeCategory)}
          activeCategory={activeCategory}
        />
      </Suspense>
    </div>
  );
};
export default HomeContent;
