import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { showErrorToast, showWarnToast } from "@/utils/toastHelpers";
import { RecipeFromDB } from "@/types/recipeTypes";

interface FavoritesContextType {
  favorites: RecipeFromDB[];
  isLoading: boolean;
  toggleFavorite: (recipe: RecipeFromDB) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<RecipeFromDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.id) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/user/favorites?userId=${session.user.id}`,
          { method: "GET" }
        );
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchFavorites();
    } else {
      setIsLoading(false);
    }
  }, [session?.user.id, status]);

  const isFavorite = (recipeId: string) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const toggleFavorite = async (recipe: RecipeFromDB) => {
    if (!session?.user?.id) {
      showWarnToast("Please log in to add favorites.");
      return;
    }

    const isCurrentlyFavorite = isFavorite(recipe.id);

    try {
      const response = await fetch("/api/user/favorites", {
        method: isCurrentlyFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe, userId: session?.user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorites.");
      }

      const updatedFavorites = await response.json();

      setFavorites(updatedFavorites.favorites);
    } catch (error) {
      console.error(error);
      showErrorToast("Unable to update favorites. Please try again.");
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
