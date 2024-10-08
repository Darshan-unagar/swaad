import React from "react";

const RecipeSkeleton = () => {
  return (
    <div className="bg-dark rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-700 mb-2 rounded"></div>
        <div className="h-3 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
