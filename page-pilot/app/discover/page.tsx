'use client';

import React, { useEffect, useState } from 'react';
import Results from '../components/Results';
import axios from 'axios';

const Discover: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genreResults, setGenreResults] = useState<any[]>([]);

  useEffect(() => {
    // Get the selected genre from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');

    if (genre) {
      setSelectedGenre(decodeURIComponent(genre));

      // Call the Google Books API based on the selected genre
      fetchBooksByGenre(genre);
    }
  }, []);

  const fetchBooksByGenre = async (genre: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const maxResults = 30;
    let startIndex = 0;
    let fetchedBooks: any[] = [];

    while (fetchedBooks.length < maxResults) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}&key=${apiKey}&startIndex=${startIndex}&maxResults=40`;
      const response = await axios.get(url);
      const batchBooks = response.data.items || [];

      console.log('API Response:', response.data); // Moved inside the loop
      
      if (batchBooks.length === 0) {
        // No more results, break the loop
        break;
      }
      
      fetchedBooks = fetchedBooks.concat(batchBooks);
      startIndex += batchBooks.length;
    }
    
    console.log('Number of items fetched:', fetchedBooks.length);

    setGenreResults(fetchedBooks.slice(0, maxResults)); // Limit to the first 30 results
  } catch (error) {
    console.error('Error fetching books by genre:', error);
  }
};




  return (
  <div className="w-full mx-auto flex flex-col justify-center items-center">
    <h1>Discover</h1>
    {selectedGenre && <p>Results for genre: {selectedGenre}</p>}
    <Results bookData={genreResults} />
  </div>
);
};

export default Discover;
