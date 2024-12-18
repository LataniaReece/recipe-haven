const categories = [
  {
    label: "Breakfast",
    url: "/breakfast",
  },
  {
    label: "Lunch",
    url: "/lunch",
  },
  {
    label: "Dinner",
    url: "/dinner",
  },
  {
    label: "Snacks",
    url: "/snack",
  },
  {
    label: "Desserts",
    url: "/desserts",
  },
];

const CategoriesSearchButtons = () => {
  return (
    <div className="space-x-4">
      {categories.map((category) => {
        return (
          <button
            key={category.label}
            className="border border-textColorLight text-textColorLight text-sm  py-2 px-4 rounded-full hover:bg-textColor hover:border-textColor hover:text-white hover:cursor-pointer transition duration-150"
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
export default CategoriesSearchButtons;
