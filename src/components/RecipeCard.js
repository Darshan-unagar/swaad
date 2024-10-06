import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-[#140f00] text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative h-56">
          <img
            className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            src={recipe.thumbnail_url}
            alt={recipe.name}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">
            {recipe.name}
          </h2>
          <div className="text-[#fa9205] mt-2 text-sm flex items-center">
          <span className="material-icons" style={{ transform: 'rotate(45deg)', fontSize: '24px' }}>arrow_upward</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
