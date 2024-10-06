import React from 'react';
import Header from './components/Header';
import Slogan from './components/Slogan';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails'; // Import the RecipeDetails component
import { ThemeProvider } from './components/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-light dark:bg-dark text-black dark:text-white">
          <Header />
          <div className="px-8 py-6">
            <Slogan />
            <SearchBar />
            {/* Define your routes */}
            <Routes>
              {/* The main recipe list route */}
              <Route path="/" element={<RecipeList />} />
              
              {/* The route for individual recipe details */}
              <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
