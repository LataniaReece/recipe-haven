import { Playfair_Display } from "next/font/google";
import CategoriesSearchButtons from "./CategoriesSearchButtons";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const MainContent = () => {
  return (
    <div className="h-full text-textColor pt-4 px-6">
      <h1
        className={`text-textColor text-4xl font-bold ${playfairDisplay.className} mb-10`}
      >
        Simple Recipes, Extraordinary Meals
      </h1>
      <CategoriesSearchButtons />
    </div>
  );
};
export default MainContent;
