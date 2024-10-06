import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import RecipeSkeleton from './SkeletonCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4deda5c1acmsha35316d39f00cc4p118337jsn15be19eeff0e',
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => <RecipeSkeleton key={index} />)
        : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </div>
  );
};

export default RecipeList;
