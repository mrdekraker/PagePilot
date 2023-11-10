// use client

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Function to update search results
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <main className="leading-7">
      <div className="border bg-ocean-surf text-center my-8 p-6">
        <h1 className="text-6xl">Discover Books You'll Love</h1>
        <p className="text-2xl">Your all-in-one book companion.</p>
        <SearchBar onSearch={handleSearch} /> {/* Pass the onSearch function */}
      </div>
      <div>
        <Results results={searchResults} /> {/* Pass the search results to the Results component */}
      </div>
    </main>
  );
}
