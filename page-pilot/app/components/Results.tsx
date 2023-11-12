import React from 'react';
import Card from './Card'; // Import the Card component
import CardHero from './CardHero'; // Import the CardHero component

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
  const [showCardHero, setShowCardHero] = React.useState(false);

  const handleDiscoverMoreClick = () => {
    setShowCardHero(true);
  };

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
          onDiscoverMoreClick={handleDiscoverMoreClick} // Pass the click handler as a prop
        />
      ))}
      {showCardHero && <CardHero />} {/* Render CardHero conditionally */}
    </div>
  );
};

export default Results;
