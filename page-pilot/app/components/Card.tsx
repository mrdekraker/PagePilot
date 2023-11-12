import React from 'react';

type BookProps = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks: { thumbnail: string };
};

type CardProps = {
  book: BookProps;
  onDiscoverMoreClick: (book: BookProps) => void; // Modify the type to accept the book parameter
};

const Card: React.FC<CardProps> = ({ book, onDiscoverMoreClick }) => {
  const { title, authors, publisher, publishedDate, description, imageLinks } = book;

  // Check if imageLinks is defined before accessing its thumbnail property
  const thumbnailUrl = imageLinks?.thumbnail || 'placeholder-image-url';

  // Check if authors is defined and has length before calling join
  const authorsText = authors && authors.length > 0 ? authors.join(', ') : 'Unknown Author';

  // Truncate description to a specific length (e.g., 150 characters)
  const maxDescriptionLength = 150;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  const handleClickDiscoverMore = () => {
    onDiscoverMoreClick(book); // Pass the book to the parent handler
  };

  return (
    <div className="border border-ocean-deep flex pr-2">
      {/* Left Column */}
      <div className="h-[208px]">
        <img className="w-full h-full object-contain" src={thumbnailUrl} alt={title} />
      </div>

      {/* Right Column */}
      <div className="descriptions flex-1 ml-4 flex flex-col justify-between">
        <div>
          <h3 className="title">{title}</h3>
          <p className="text-gray-700 text-sm">Author: {authorsText}</p>
          <p className="text-gray-700 text-sm">Publisher: {publisher}</p>
          <p className="text-gray-700 text-sm">Published Date: {publishedDate}</p>
          <p className="text-gray-700 text-sm">Description: {truncatedDescription}</p>
        </div>

        <div className="mt-auto flex items-center justify-center">
          <div
            className="cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            onClick={handleClickDiscoverMore}
          >
            Discover More
          </div>
          <div
            className="cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            // onClick={handleClickDiscoverMore}
          >
            Understand More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
