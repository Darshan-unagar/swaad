import React from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
// import AIChat from "./Ai";
import { ThemeProvider } from "./components/ThemeContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-light dark:bg-dark text-black dark:text-white">
          <Header />
          <MainContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Create a new component for conditional rendering
const MainContent = () => {
  const location = useLocation();

  return (
    <div className="px-8 py-6">
      {/* Conditionally render Slogan and SearchBar only if not on /ai page */}
      {location.pathname !== '/ai' && (
        <>
          <Slogan />
          <SearchBar />
        </>
      )}
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        {/* <Route path="/ai" element={<AIChat />} /> Use 'element' instead of 'component' */}
      </Routes>
    </div>
  );
};

export default App;
