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
  };
};

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genreResults, setGenreResults] = useState<any[]>([]);
  const [showCardHero, setShowCardHero] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [suggestions, setSuggestions] = useState<Book[]>([]);

  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 1000;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get("genre");

    if (genre) {
      setSelectedGenre(decodeURIComponent(genre));
    }
  }, []);

  const resetResults = () => {
    setSearchResults([]);
    setGenreResults([]);
    setShowCardHero(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    if (selectedGenre) {
      fetchBooksByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const handleSearch = async (query: string, retries = 0): Promise<void> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${apiKey}`;

      const response = await axios.get(url);

      const books: Book[] = response.data.items.map((item: any) => ({
        volumeInfo: item.volumeInfo,
      }));

      setSearchResults(books.slice(0, 5));
      await fetchBooks(query);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        if (retries < MAX_RETRIES) {
          console.log(
            `Rate limit exceeded. Retrying after ${
              RETRY_DELAY_MS / 1000
            } seconds.`
          );
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
          return handleSearch(query, retries + 1);
        } else {
          console.error("Exceeded the maximum number of retries. Aborting.");
        }
      } else {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleBookSelect = (selectedBook: any) => {
    setSelectedBook(selectedBook);
    setShowCardHero(true);
  };

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    resetResults(); // Call resetResults when a new genre is selected
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
        let searchQuery = category.toLowerCase();
        const searchQueries = [
          `${searchQuery} fiction`,
          `${searchQuery} non-fiction`,
        ];

        const responses = await Promise.all(
          searchQueries.map((query) =>
            axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
                query
              )}&key=${apiKey}&startIndex=${startIndex}&maxResults=40`
            )
          )
        );

        responses.forEach((response) => {
          const batchBooks = response.data.items || [];

          if (batchBooks.length > 0) {
            fetchedBooks = fetchedBooks.concat(batchBooks);
            startIndex += batchBooks.length;
          }
        });

        responses.forEach((response, index) => {
          console.log(
            `API Response ${index + 1} for category:`,
            category,
            response.data
          );
        });

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

  const fetchBooks = async (query: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${apiKey}`;

      const response = await axios.get(url);

      const books: Book[] = response.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        volumeInfo: item.volumeInfo,
      }));

      setSuggestions(books.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <main className="leading-7">
      <div className="border bg-ocean-surf text-center my-8 p-6">
        <h1 className="text-6xl">Discover Books You'll Love</h1>
        <p className="text-2xl">Your all-in-one book companion.</p>
        <SearchBar
          onSearch={handleSearch}
          onBookSelect={handleBookSelect}
          fetchBooks={fetchBooks} // Pass the fetchBooks function as a prop
        />
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
