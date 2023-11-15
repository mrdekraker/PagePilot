"use client";

// Home.tsx
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Genre from "./components/Genre";
import Results from "./components/Results";
import CardHero from "./components/CardHero";
import axios from "axios";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genreResults, setGenreResults] = useState<any[]>([]);
  const [showCardHero, setShowCardHero] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  useEffect(() => {
    // Use other means to get query parameters if needed
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get("genre");

    if (genre) {
      setSelectedGenre(decodeURIComponent(genre));
      fetchBooksByGenre(genre);
    }
  }, []);

  useEffect(() => {
    // Fetch new results when selectedGenre changes
    if (selectedGenre) {
      fetchBooksByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  const handleDiscoverMoreClick = (book: any) => {
    setSelectedBook(book);
    setShowCardHero(true);
  };

  const fetchBooksByGenre = async (genre: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      const maxResults = 30;
      let startIndex = 0;
      let fetchedBooks: any[] = [];

      while (fetchedBooks.length < maxResults) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
          genre
        )}&key=${apiKey}&startIndex=${startIndex}&maxResults=40`;
        const response = await axios.get(url);
        const batchBooks = response.data.items || [];

        if (batchBooks.length === 0) {
          // No more results, break the loop
          break;
        }

        fetchedBooks = fetchedBooks.concat(batchBooks);
        startIndex += batchBooks.length;

        // Log the API response
        console.log("API Response for genre:", genre, response.data);
      }

      setGenreResults(fetchedBooks.slice(0, maxResults)); // Limit to the first 30 results
      setShowCardHero(false); // Reset the CardHero
    } catch (error) {
      console.error("Error fetching books by genre:", error);
    }
  };

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
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
        <Genre onSelectGenre={setSelectedGenre} />
      </div>

      <div className="flex justify-center">
        {showCardHero && selectedBook && (
          <CardHero
            title={selectedBook.volumeInfo.title}
            authors={selectedBook.volumeInfo.authors}
            publisher={selectedBook.volumeInfo.publisher}
            publishedDate={selectedBook.volumeInfo.publishedDate}
            description={selectedBook.volumeInfo.description}
            imageLinks={selectedBook.volumeInfo.imageLinks}
            infoLink={selectedBook.volumeInfo.infoLink}
          />
        )}
      </div>
      <Results
        bookData={genreResults}
        onDiscoverMoreClick={handleDiscoverMoreClick}
      />
    </main>
  );
}
