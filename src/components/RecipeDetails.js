import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Skeleton Component
const Skeleton = () => (
  <div className="flex">
    <div className="w-1/2 h-64 bg-gray-300 animate-pulse rounded-lg mb-6"></div>
    <div className="flex-1 ml-6">
      <div className="h-8 bg-gray-300 animate-pulse rounded mb-4"></div>
      <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
      <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
      <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
      <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
    </div>
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
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
      <div className="flex">
        {/* Left Side - Image */}
        <div className="w-1/2 mb-6">
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Right Side - Details */}
        <div className="flex-1 ml-6">
          <p className="mb-4">{recipe.description}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">Ingredients:</h2>
          <ul className="list-disc ml-6 mb-4">
            {recipe.sections.map((section) =>
              section.components.map((component) => (
                <li key={component.id}>
                  {component.measurements[0].quantity} {component.ingredient.name} {component.extra_comment}
                </li>
              ))
            )}
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-2">Instructions:</h2>
          <ol className="list-decimal ml-6 mb-4">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id}>{instruction.display_text}</li>
            ))}
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-2">Nutrition Information:</h2>
          <ul className="mb-4">
            <li>Calories: {recipe.nutrition.calories}</li>
            <li>Protein: {recipe.nutrition.protein}g</li>
            <li>Carbohydrates: {recipe.nutrition.carbohydrates}g</li>
            <li>Fat: {recipe.nutrition.fat}g</li>
            <li>Sugar: {recipe.nutrition.sugar}g</li>
            <li>Fiber: {recipe.nutrition.fiber}g</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">Cooking Time:</h2>
          <p>Preparation Time: {recipe.prep_time_minutes} minutes</p>
          <p>Cook Time: {recipe.cook_time_minutes} minutes</p>
          <p>Total Time: {recipe.total_time_minutes} minutes</p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">Servings:</h2>
          <p>{recipe.yields}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;