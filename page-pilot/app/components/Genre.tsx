import React from 'react';

interface GenreProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string) => void;
}

const genres = [
  'Mystery/Thriller',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Historical Fiction',
  'Dystopian Fiction',
  'Young Adult (YA) Fiction',
  'Contemporary Fiction',
  'Non-Fiction',
  'Biography/Memoir',
  'Self-Help/Motivational',
  'Horror',
  'Classic Literature',
  'Adventure/Action',
  "Children's Books",
];

const Genre: React.FC<GenreProps> = ({ selectedGenre, onSelectGenre }) => {
  return (
    <div className="grid grid-cols-5 gap-4 justify-items-center mb-4">
      {genres.map((genre, index) => (
        <button
          key={index}
          className={`w-full bg-ocean-blue text-white px-4 py-2 rounded hover:bg-ocean-deep ${
            selectedGenre === genre ? 'bg-ocean-deep' : ''
          }`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Genre;
