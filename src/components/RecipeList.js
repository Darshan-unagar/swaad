import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeSkeleton from "./SkeletonCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Track the current page (from parameter)
  const [loadingMore, setLoadingMore] = useState(false); // Track if more recipes are being loaded

  const loadRecipes = (currentPage) => {
    setLoading(currentPage === 0); // Only show initial loading skeleton on the first load
    setLoadingMore(currentPage > 0); // Show a spinner or loading state for loading more recipes

    fetch(
      `https://tasty.p.rapidapi.com/recipes/list?from=${currentPage * 20}&size=20&tags=under_30_minutes`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "tasty.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  useEffect(() => {
    loadRecipes(page); // Load initial set of recipes
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page and load more recipes
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <RecipeSkeleton key={index} />)
          : recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id ? recipe.id : `recipe-${index}`} recipe={recipe} />
            ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        {loadingMore ? (
          <button
            disabled
            className="px-6 py-3 bg-gray-500 text-white rounded-lg cursor-not-allowed"
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-[#fa9205] text-white rounded-lg hover:bg-[#e88805] transition-colors"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
