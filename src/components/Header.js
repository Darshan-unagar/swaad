import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-light dark:bg-dark shadow-lg">
      <div className="flex items-center">
        <span className="text-2xl font-bold">📖 swaad.</span>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        {/* <a href="https://github.com" className="ml-4 text-2xl">🐱</a> */}
      </div>
    </header>
  );
};

export default Header;
