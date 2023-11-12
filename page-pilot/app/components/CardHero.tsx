import React from 'react';

interface CardHeroProps {
  book: {
    title: string;
    publisher: string;
    publishedDate: string;
    // ... other book properties
  };
}

const CardHero: React.FC<CardHeroProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>Publisher: {book.publisher}</p>
      <p>Published Date: {book.publishedDate}</p>
      {/* ... other book details */}
    </div>
  );
};

export default CardHero;
