import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button className="ml-2 p-3 bg-orange-500 text-white rounded-lg">Ctrl+k</button>
    </div>
  );
};

export default SearchBar;
