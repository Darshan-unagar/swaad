import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Skeleton Component for loading state
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-96 rounded-lg mb-6"></div>
    <div className="h-8 bg-gray-300 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded mb-4"></div>
  </div>
);

const RecipeDetails = () => {
  const { id } = useParams(); // Fetch the id from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4deda5c1acmsha35316d39f00cc4p118337jsn15be19eeff0e',
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (loading) {
    return <Skeleton />; // Show skeleton while loading
  }

  return (
    <div className="bg-[#140f00] text-white p-8 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Image */}
        <div className="mb-6">
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-[500px] object-cover object-center rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <p className="mb-4 text-gray-400">{recipe.description}</p>

          {/* Nutrition Information */}
          <div className="flex space-x-4 mb-6">
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-lg font-bold">{recipe.nutrition.calories}</p>
              <p className="text-sm">Calories</p>
            </div>
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-lg font-bold">{recipe.nutrition.protein}g</p>
              <p className="text-sm">Protein</p>
            </div>
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-lg font-bold">{recipe.nutrition.carbohydrates}g</p>
              <p className="text-sm">Carbs</p>
            </div>
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-lg font-bold">{recipe.nutrition.fat}g</p>
              <p className="text-sm">Fat</p>
            </div>
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-lg font-bold">{recipe.nutrition.sugar}g</p>
              <p className="text-sm">Sugar</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
              {recipe.servings} Servings
            </span>
            <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 ml-2 rounded">
              {recipe.total_time_minutes} Minutes
            </span>
          </div>

          {/* Ingredients */}
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc ml-6 mb-6">
            {recipe.sections.map((section) =>
              section.components.map((component) => (
                <li key={component.id} className="mb-2">
                  {component.measurements[0].quantity} {component.ingredient.name} {component.extra_comment}
                </li>
              ))
            )}
          </ul>

          {/* Instructions */}
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal ml-6 space-y-4">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id}>{instruction.display_text}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
