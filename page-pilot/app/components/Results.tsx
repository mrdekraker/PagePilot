import React from 'react';
import Card from './Card';

interface ResultsProps {
  bookData: {
    volumeInfo: {
      title: string;
      publisher: string;
      publishedDate: string;
      description: string;
      imageLinks: { thumbnail: string };
      authors: string[];
    };
  }[];
  onDiscoverMoreClick: (book: any) => void; // Add the prop for the click event
}

const Results: React.FC<ResultsProps> = ({ bookData, onDiscoverMoreClick }) => {
  const limitedBookData = bookData.slice(0, 30);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {limitedBookData.map((book, index) => (
        <Card
          key={index}
          book={{
            title: book.volumeInfo.title,
            publisher: book.volumeInfo.publisher || 'Unknown Publisher',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
            description: book.volumeInfo.description || 'No description available',
            imageLinks: {
              thumbnail: book.volumeInfo.imageLinks?.thumbnail || 'placeholder-image-url',
            },
            authors: book.volumeInfo.authors || ['Unknown Author'],
          }}
          onDiscoverMoreClick={() => onDiscoverMoreClick(book)} // Pass the book to the handler
        />
      ))}
    </div>
  );
};

export default Results;
