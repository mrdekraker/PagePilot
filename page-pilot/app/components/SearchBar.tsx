import React, { useState, ChangeEvent, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type Book = {
  title: string;
  volumeInfo: any;
};

interface SearchBarProps {
  onSearch: (query: string) => void;
  onBookSelect: (book: Book) => void;
  fetchBooks: (query: string) => Promise<void>;
}

const BookSuggestion: React.FC<{
  title: string;
  onBookSelect: (selectedBook: Book) => void;
}> = ({ title, onBookSelect }) => (
  <div className="flex items-center">
    <span
      className="mr-2"
      onClick={() => onBookSelect({ title, volumeInfo: {} })}>
      {title}
    </span>
  </div>
);

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onBookSelect,
  fetchBooks,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      await fetchBooks(query);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Error fetching books");
    }
  };

  const handleSearchTrigger = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onSearch(query); // Trigger the search when the Enter key is pressed
    }
  };

  const handleSuggestionClick = (book: Book) => {
    setQuery(""); // Clear the search bar
    setSuggestions([]); // Clear the suggestions dropdown
    onBookSelect(book); // Assuming you want to select the first book in the list
    onSearch(book.title); // Pass the book title to onSearch
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (query.length >= 3) {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
          const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&key=${apiKey}`;

          const delay = 300; // Adjust the delay as needed
          const timerId = setTimeout(async () => {
            const response = await fetch(url);

            if (response.status === 429) {
              throw new Error("Too Many Requests");
            }

            const data = await response.json();

            const books: Book[] = (data.items || []).map((item: any) => ({
              title: item.volumeInfo.title,
              volumeInfo: item.volumeInfo,
            }));

            setSuggestions(books.slice(0, 5));
          }, delay);

          return () => clearTimeout(timerId);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Error fetching suggestions");
      }
    };

    fetchSuggestions();
  }, [query]);

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
          onKeyDown={handleSearchTrigger}
          autoComplete="off"
          className="w-full py-4 pl-10 px-6 text-lg text-gray-700 border border-ocean-blue rounded-md focus:outline-none focus:ring-1 focus:ring-ocean-deep"
        />
        {error && <p className="text-red-500">{error}</p>}
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-ocean-blue rounded-md mt-1">
            {suggestions.map((book, index) => (
              <li
                key={index}
                className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(book)}>
                <BookSuggestion
                  title={book.title}
                  onBookSelect={onBookSelect}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
