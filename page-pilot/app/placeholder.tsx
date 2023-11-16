"use client";
// Home.tsx
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Genre from "./components/Genre";
import Results from "./components/Results";
import CardHero from "./components/CardHero";
import axios from "axios";

type Book = {
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    infoLink: string;
    categories: string[];
    // Add more properties if needed
  };
  // Add other properties if needed
};

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

  const handleBookSelect = (selectedBook: any) => {
    setSelectedBook(selectedBook);
    setShowCardHero(true);
  };

  const handleDiscoverMoreClick = (book: any) => {
    setSelectedBook(book);
    setShowCardHero(true);
  };

  const fetchBooksByGenre = async (category: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      const maxResults = 30;
      let startIndex = 0;
      let fetchedBooks: any[] = [];

      while (fetchedBooks.length < maxResults) {
        // Start with the lowercase category
        let searchQuery = category.toLowerCase();

        // Append "fiction" and "non-fiction" along with the category
        const searchQueries = [
          `${searchQuery} fiction`,
          `${searchQuery} non-fiction`,
        ];

        // Use Promise.all to make parallel API requests
        const responses = await Promise.all(
          searchQueries.map((query) =>
            axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
                query
              )}&key=${apiKey}&startIndex=${startIndex}&maxResults=40`
            )
          )
        );

        // Process each response
        responses.forEach((response) => {
          const batchBooks = response.data.items || [];

          if (batchBooks.length > 0) {
            // Append books to the fetchedBooks array
            fetchedBooks = fetchedBooks.concat(batchBooks);
            startIndex += batchBooks.length;
          }
        });

        // Log the API responses
        responses.forEach((response, index) => {
          console.log(
            `API Response ${index + 1} for category:`,
            category,
            response.data
          );
        });

        // Check if there are enough results, break the loop if needed
        if (fetchedBooks.length >= maxResults) {
          break;
        }
      }

      setGenreResults(fetchedBooks.slice(0, maxResults));
      setShowCardHero(false);
    } catch (error) {
      console.error("Error fetching books by category:", error);
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
        <SearchBar onSearch={handleSearch} onBookSelect={handleBookSelect} />
      </div>

      <div className="w-2/3 mx-auto items-center sm:my-10 sm:p-2">
        <Genre onSelectGenre={handleGenreClick} />
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
        bookData={selectedGenre ? genreResults : searchResults}
        onDiscoverMoreClick={handleDiscoverMoreClick}
      />
    </main>
  );
}
