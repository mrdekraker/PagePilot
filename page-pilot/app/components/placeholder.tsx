import React, { useState, ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

interface Book {
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    authors: string[];
    publishedDate: string;
  };
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (newQuery: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(newQuery)}&key=${apiKey}`
    );

    if (response.status === 200) {
      const data = response.data;

      // Extract the top 5 book titles from the API response
      const topTitles = data.items.slice(0, 5).map((item: Book) => item.volumeInfo.title);

      setSuggestions(topTitles);
    } else {
      console.error('Error fetching suggestions:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};


  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    await fetchSuggestions(newQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="flex items-center justify-center my-4">
      <div className="w-1/3 relative">
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={handleInputChange}
          className="w-full py-4 pl-10 px-6 text-lg text-gray-700 border border-ocean-blue rounded-md focus:outline-none focus:ring-1 focus:ring-deep-ocean"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-ocean-blue rounded-md mt-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
