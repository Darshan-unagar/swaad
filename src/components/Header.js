import React from 'react';
import ThemeToggle from './ThemeToggle';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const Header = ({ isChatPage, clearChat }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-light dark:bg-dark shadow-lg">
      <div className="flex items-center">
        <span className="text-2xl font-bold"><a href='/'>🍽️ Swaad</a></span>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <span className="ml-4"><a href='/ai'>Swaad AI</a></span>
        {isChatPage && (  // Render the button only if on ChatPage
          <button 
            className="ml-4 bg-transparent text-red-500 p-2 rounded"
            onClick={clearChat} // Call clearChat on click
            data-tip="Clear Chat" // Tooltip text
            data-for="clearChatTooltip" // Reference the tooltip
          >
            <FaTrash size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
