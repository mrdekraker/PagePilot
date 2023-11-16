import React from "react";

interface GenreProps {
  onSelectGenre: (genre: string) => void;
}

const genres = [
  "Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Historical Fiction",
  "Dystopian Fiction",
  "Young Adult (YA) Fiction",
  "Contemporary Fiction",
  "Non-Fiction",
  "Biography",
  "Self-Help",
  "Horror",
  "Classic Literature",
  "Adventure",
  "Children's Books",
];

const Genre: React.FC<GenreProps> = ({ onSelectGenre }) => {
  const handleGenreClick = (genre: string) => {
    onSelectGenre(genre);
  };

  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
      {genres.map((genre, index) => (
        <button
          key={index}
          className={`w-full bg-ocean-blue text-white px-4 py-2 rounded hover:bg-ocean-deep`}
          onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Genre;
