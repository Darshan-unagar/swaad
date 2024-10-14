// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import ChatPage from "./components/ChatPage";
import { ThemeProvider } from "./components/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"; // Import the ErrorBoundary

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-light dark:bg-dark text-black dark:text-white">
          <ErrorBoundary>
            <MainContent />
          </ErrorBoundary>
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Main Content
const MainContent = () => {
  const location = useLocation();
  const [chatMessages, setChatMessages] = useState([]); // Initialize chat messages state

  const clearChat = () => {
    setChatMessages([]); // Clear messages in the parent state
    localStorage.removeItem("chatMessages"); // Clear from local storage
    window.location.reload();
  };

  return (
    <>
      <Header isChatPage={location.pathname === "/ai"} clearChat={clearChat} /> {/* Conditional rendering */}
      <Routes>
        <Route path="/" element={<><Slogan /><SearchBar /><RecipeList /></>} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/ai" element={<ChatPage chatMessages={chatMessages} setChatMessages={setChatMessages} />} />
      </Routes>
    </>
  );
};

export default App;
