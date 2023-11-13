import React, { useState, ChangeEvent, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";

interface Book {
  title: string;
}

interface SearchBarProps {
  onSearch: (results: Book[]) => void;
}

const BookSuggestion: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center">
    {/* Add your book icon here, e.g., <BookIcon className="w-6 h-6 mr-2" /> */}
    <span className="mr-2">{title}</span>
  </div>
);

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      fetchBooks();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchBooks = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);

      const books = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
      }));

      setSuggestions(books.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (bookTitle: string) => {
    setQuery(bookTitle);
    onSearch([{ title: bookTitle }]); // Update results when suggestion is clicked
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(suggestions); // Update results when Enter key is pressed
    }
  };

  return (
    <div className="flex items-center justify-center my-4">
      <div className="sm:w-1/3 relative">
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          name="search"
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          className="w-full py-4 pl-10 px-6 text-lg text-gray-700 border border-ocean-blue rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-deep"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-ocean-blue rounded-md mt-1">
            {suggestions.map((book, index) => (
              <li
                key={index}
                className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(book.title)}>
                <BookSuggestion title={book.title} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
