"use client";

import { FaSearch } from "react-icons/fa";

interface SearchRecipeProps {
  onSearch: (query: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsNoSearchResultsFound: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchApiUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchRecipe: React.FC<SearchRecipeProps> = ({
  onSearch,
  query,
  setQuery,
  setIsNoSearchResultsFound,
  setSearchApiUrl,
}) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsNoSearchResultsFound(false);

    if (e.target.value.trim() === "") {
      setIsNoSearchResultsFound(false);
      setSearchApiUrl(null);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center px-6 mb-10 max-w-xl "
    >
      <label htmlFor="search-recipe" className="sr-only">
        Search for a recipe
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          type="text"
          id="search-recipe"
          value={query}
          onChange={handleChange}
          placeholder="Search for a recipe..."
          className="w-full pl-8 p-2.5 text-sm border rounded-lg focus:ring-primaryColor focus:border-primaryColor bg-gray-50 border-gray-300"
        />
      </div>
      <button
        type="submit"
        className="ml-2 p-2.5 bg-primaryColor hover:bg-primaryColorLight text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none focus:ring-primaryColorLight"
      >
        Search
      </button>
    </form>
  );
};

export default SearchRecipe;
