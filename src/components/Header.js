import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-light dark:bg-dark shadow-lg">
      <div className="flex items-center">
        <span className="text-2xl font-bold"><a href='/'>🍽️ Swaad</a></span>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <span className="ml-4"><a href='/ai'>Swaad AI</a></span>
      </div>
    </header>
  );
};

export default Header;
