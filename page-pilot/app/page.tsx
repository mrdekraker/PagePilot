'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import Genre from './components/Genre';

export default function Home() {
  // const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]); // State to store search results
  const [selectedGenre, setSelectedGenre] = useState<string>(''); // State to store selected genre

  // Function to update search results
  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  // Function to update selected genre
  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);

    // router.push(`/discover?genre=${encodeURIComponent(genre)}`);
};

  return (
    <main className="leading-7">
      <div className="border bg-ocean-surf text-center my-8 p-6">
        <h1 className="text-6xl">Discover Books You'll Love</h1>
        <p className="text-2xl">Your all-in-one book companion.</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="w-2/3 mx-auto items-center sm:my-10 sm:p-6">
        <Genre
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />
      </div>
    </main>
  );
}