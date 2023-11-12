import React, { useState } from 'react';
import Link from 'next/link';

interface GenreProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string) => void;
}

const genres = [
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Historical Fiction',
  'Dystopian Fiction',
  'Young Adult (YA) Fiction',
  'Contemporary Fiction',
  'Non-Fiction',
  'Biography',
  'Self-Help',
  'Horror',
  'Classic Literature',
  'Adventure',
  "Children's Books",
];

const Genre: React.FC<GenreProps> = ({ selectedGenre, onSelectGenre }) => {
  const handleGenreClick = (genre: string) => {
    onSelectGenre(genre);
  };

  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
      {genres.map((genre, index) => (
        <Link className="w-full" key={index} href={`/discover?genre=${encodeURIComponent(genre)}`}>
            <button
              className={`w-full bg-ocean-blue text-white px-4 py-2 rounded hover:bg-ocean-deep ${
                selectedGenre === genre ? 'bg-ocean-deep' : ''
              }`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
        </Link>
      ))}
    </div>
  );
};

export default Genre;
