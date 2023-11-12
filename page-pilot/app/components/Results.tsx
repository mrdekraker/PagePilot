// Results.tsx

import React from 'react';

interface ResultsProps {
  bookData: { volumeInfo: { title: string, authors: string[], description: string, imageLinks: { thumbnail: string } } }[];
}

const Results: React.FC<ResultsProps> = ({ bookData }) => {
  const limitedBookData = bookData.slice(0, 30); // Limit to the first 30 results

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
      {limitedBookData.map((book, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'placeholder-image-url'}
            alt={book.volumeInfo.title}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h3 className="text-xl font-semibold mb-2">{book.volumeInfo.title}</h3>
          <p className="text-gray-600 mb-4">
            {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
          </p>
          {book.volumeInfo.description && (
            <p className="text-gray-700 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {book.volumeInfo.description.length > 150
                ? book.volumeInfo.description.substring(0, 150) + '...'
                : book.volumeInfo.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;
