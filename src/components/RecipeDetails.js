import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useTheme } from "./ThemeContext";

const Skeleton = () => (
  <div className="p-8 min-h-screen bg-[#140f00] text-white animate-pulse">
    {/* Flex container to mimic image and recipe info */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-10 gap-8">
      {/* Skeleton for the image */}
      <div className="lg:w-1/3 w-full">
        <div className="w-full h-[300px] bg-gray-700 rounded-lg shadow-lg"></div>
      </div>

      {/* Skeleton for the recipe info */}
      <div className="lg:w-2/3 w-full">
        <div className="h-10 bg-gray-700 rounded-lg mb-4"></div> {/* Title */}
        <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
        {/* Description */}
        <div className="h-4 bg-gray-600 rounded-lg w-1/2 mb-4"></div>{" "}
        {/* Servings & Time */}
        {/* Quick Info Section */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md">
          <div className="h-8 bg-gray-700 rounded-lg mb-4 w-1/3"></div>{" "}
          {/* Quick Info Title */}
          <div className="h-4 bg-gray-600 rounded-lg mb-3"></div>{" "}
          {/* Difficulty */}
          <div className="h-4 bg-gray-600 rounded-lg mb-3"></div>{" "}
          {/* Published Date */}
          <div className="h-4 bg-gray-600 rounded-lg mb-3 w-1/2"></div>{" "}
          {/* Yields */}
        </div>
      </div>
    </div>

    {/* Skeleton for Ingredients and Instructions */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Ingredients Section */}
      <div className="sticky top-10">
        <div className="h-8 bg-gray-700 rounded-lg mb-4 w-1/3"></div>{" "}
        {/* Ingredients Title */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Ingredient section */}
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Ingredient section */}
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Ingredient section */}
        </div>
      </div>

      {/* Instructions Section */}
      <div>
        <div className="h-8 bg-gray-700 rounded-lg mb-4 w-1/3"></div>{" "}
        {/* Instructions Title */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Instruction */}
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Instruction */}
          <div className="h-4 bg-gray-600 rounded-lg mb-4"></div>{" "}
          {/* Instruction */}
        </div>
      </div>
    </div>
  </div>
);

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })

      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div
      className={`p-8 min-h-screen ${
        isDarkMode ? "bg-[#140f00] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center mb-10 gap-8">
        {/* Image */}
        <div className="lg:w-1/3 w-full">
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-[300px] object-cover object-center rounded-lg shadow-lg"
          />
        </div>

        {/* Recipe Info */}
        <div className="lg:w-2/3 w-full">
          <h1 className="text-4xl font-bold tracking-wide mb-4">
            {recipe.name}
          </h1>
          <p className="mb-4 text-gray-400">{recipe.description}</p>

          <div className="text-sm text-[#fa9205] flex items-center space-x-3 mb-4">
            <span>🍽️ {recipe.servings} Servings</span>
            <span>⏰ {recipe.total_time_minutes} Minutes</span>
          </div>

          <div
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-200"
            }`}
          >
            <h3 className="text-2xl font-bold text-[#fa9205] mb-2">
              Quick Info
            </h3>
            {/* <p>
              <strong>Difficulty:</strong> {recipe.difficulty || "Not Available"}
            </p> */}
            <p>
              <strong>Published Date:</strong>{" "}
              {new Date(recipe.created_at * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Yields:</strong> {recipe.yields || "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Details - Ingredients and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <MdOutlineLocalGroceryStore className="mr-2" /> Ingredients
          </h2>
          <div
            className={`p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-200"
            }`}
          >
            {recipe.sections.map((section) => (
              <div key={section.name} className="mb-6">
                {section.name && (
                  <div className="flex items-center mb-2">
                    <BsArrowReturnRight className="text-[#fa9205]" />
                    <span className="ml-2 font-bold uppercase">
                      {section.name}
                    </span>
                  </div>
                )}
                <ul className="list-none space-y-3">
                  {section.components.map((component) => (
                    <li key={component.id} className="flex items-center">
                      <label
                        htmlFor={component.id.toString()}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={component.id.toString()}
                          className="hidden peer"
                        />
                        <FaCheck className="mr-2 hidden peer-checked:block text-[#fa9205]" />
                        <span className="peer-checked:line-through">
                          {component.ingredient.name}
                          {component.extra_comment && (
                            <span className="text-gray-400">
                              {" "}
                              ({component.extra_comment})
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal ml-6 space-y-4">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id} className="leading-relaxed">
                {instruction.display_text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
