"use client";

// Import the necessary dependencies
import React, { useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import SearchBar from "./components/SearchBar";
import Genre from "./components/Genre";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <main className="leading-7">
      <div className="border bg-ocean-surf text-center my-8 p-6">
        <h1 className="text-6xl">Discover Books You'll Love</h1>
        <p className="text-2xl">Your all-in-one book companion.</p>
        <SearchBar
          onSearch={(results) => {
            // Handle search results
            console.log(results);
          }}
          onBookSelect={(selectedBook) => {
            // Handle the selected book
            console.log(selectedBook);
            // Dispatch the selected book to your store or perform other actions
          }}
        />
      </div>

      <div className="w-2/3 mx-auto items-center sm:my-10 sm:p-2">
        <Genre selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
      </div>
    </main>
  );
}
