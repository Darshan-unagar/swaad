import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { Transition } from "@headlessui/react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(5);
  const modalRef = useRef(null);

  const fetchSearchResults = async (query) => {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ab21637bf2msh7ce8992ee0b2b89p17a8c4jsnbc6e5483e769",
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${query}`,
        options
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen(true);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      fetchSearchResults(e.target.value);
    } else {
      setResults([]);
    }
  };

  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 5);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full px-4 py-6">
        <button
          className="flex items-center w-full max-w-lg bg-secondary border border-gray-300 text-text rounded-full px-4 py-3 justify-between cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-2">
            <BiSearch size={24} />
            <p className="text-sm text-gray-500">Search recipes...</p>
          </div>
          <span className="font-semibold text-gray-500">Ctrl + K</span>
        </button>
      </div>

      <Transition show={isOpen}>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-black bg-opacity-40"
          aria-hidden="true"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-lg mx-4 bg-secondary p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <BiSearch size={24} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-dark"
              />
            </div>

            <div className="mt-4">
              {results.slice(0, visibleResults).map((result, index) => (
                <a
                  key={index}
                  href={`/recipe/${result.id}`} // Use <a> for navigation
                  className="block py-2 border-b border-gray-200 hover:bg-zinc-800"
                  onClick={() => setIsOpen(false)} // Close search bar when clicking
                >
                  <p>{result.name}</p>
                </a>
              ))}
            </div>

            {results.length > visibleResults && (
              <button
                className="mt-4 w-full text-orange-500 hover:underline"
                onClick={loadMoreResults}
              >
                Load more...
              </button>
            )}

            <button
              className="absolute top-10 right-10 text-sm text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Esc
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default SearchBar;
