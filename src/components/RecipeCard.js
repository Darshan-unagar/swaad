import React from 'react';
import { useTheme } from './ThemeContext'; 

const RecipeCard = ({ recipe }) => {
  const { isDarkMode } = useTheme();

  const cardBgColor = isDarkMode ? 'bg-[#140f00]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    <div className={`${cardBgColor} ${textColor} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group`}>
      <a href={`/recipe/${recipe.id}`}>
        <div className="relative h-56">
          <img
            className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            src={recipe.thumbnail_url}
            alt={recipe.name}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {recipe.name}
            </h2>
            <span className="material-icons text-[#fa9205]" style={{ transform: 'rotate(45deg)', fontSize: '24px' }}>arrow_upward</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default RecipeCard;
