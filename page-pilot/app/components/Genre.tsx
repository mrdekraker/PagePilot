import React, { useEffect, useState } from "react";

interface GenreProps {
  onSelectGenre: (genre: string) => void;
}

const genres = [
  "Mystery",
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Thriller",
  "Historical Fiction",
  "Biography",
  "Self-Help",
  "Horror",
  "Adventure",
  "Humor",
  "Dystopian",
  "Crime",
  "Classic",
  "Comedy",
  "Satire",
  "Drama",
  "Action",
  "Poetry",
  "Memoir",
  "Psychology",
  "Cooking",
  "History",
  "Travel",
  "Science",
  "Art",
  "Business",
];

const Genre: React.FC<GenreProps> = ({ onSelectGenre }) => {
  const [displayedGenres, setDisplayedGenres] = useState<string[]>([]);

  // Shuffle the genres on component mount
  useEffect(() => {
    const shuffledGenres = [...genres].sort(() => Math.random() - 0.5);
    setDisplayedGenres(shuffledGenres.slice(0, 15));
  }, []);

  const handleGenreClick = (genre: string) => {
    onSelectGenre(genre);
  };

  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
      {displayedGenres.map((genre, index) => (
        <button
          key={index}
          className="w-full bg-ocean-blue text-white px-4 py-2 rounded hover:bg-ocean-deep hover:shadow-xl"
          onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Genre;
