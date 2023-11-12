import React from 'react';
import Card from './Card'; // Import the Card component

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
}

const Results: React.FC<ResultsProps> = ({ bookData }) => {
  const limitedBookData = bookData.slice(0, 30); // Limit to the first 30 results

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
      {limitedBookData.map((book, index) => (
        // Use the Card component for each book
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
            authors: book.volumeInfo.authors || ['Unknown Author'], // Add this line
          }}
          onClick={() => {}} // Add your onClick handler if needed
        />
      ))}
    </div>
  );
};

export default Results;
