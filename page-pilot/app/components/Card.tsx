import React from 'react';

type BookProps = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks?: { thumbnail: string };
};

type CardProps = {
  book: BookProps;
  onDiscoverMoreClick: (book: BookProps) => void;
  renderImageOrPlaceholder: () => React.ReactNode;
};

const Card: React.FC<CardProps> = ({ book, onDiscoverMoreClick, renderImageOrPlaceholder }) => {
  const { title, authors, publisher, publishedDate, description } = book;

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
        {renderImageOrPlaceholder()}
      </div>

      {/* Right Column */}
      <div className="descriptions flex-1 ml-4 flex flex-col justify-between">
        <div>
          <h3 className="title">{title}</h3>
          <p className="text-gray-700 text-sm">Author: {authors.join(', ') || 'Unknown Author'}</p>
          <p className="text-gray-700 text-sm">Publisher: {publisher || 'Unknown Publisher'}</p>
          <p className="text-gray-700 text-sm">Published Date: {publishedDate || 'Unknown Date'}</p>
          <p className="text-gray-700 text-sm">Description: {truncatedDescription}</p>
        </div>

        <div className="mt-auto flex items-center justify-center">
          <div
            className="cursor-pointer inline-block bg-cyan-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-ocean-deep hover:text-white"
            onClick={handleClickDiscoverMore}
          >
            Discover More
          </div>
          <div
            className="cursor-pointer inline-block bg-cyan-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-ocean-deep hover:text-white"
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
