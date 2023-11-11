import React from 'react';
import Link from 'next/link';

type CardProps = {
  title: string;
  author: string;
  publisher: string;
  picture: string;
  datePublished: string;
  price: number; // Assuming price is a number
  isbn: string; // Assuming isbn is a string
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ title, author, publisher, picture, datePublished, price, isbn, onClick }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <Link href="/discover" passHref>
        <div className="cursor-pointer">
          <img className="w-full h-32 object-contain" src={picture} alt={title} />
        </div>
      </Link>
      <div className="px-4 py-2">
        <div className="font-bold text-md mb-1">{title}</div>
        <p className="text-gray-700 text-sm">Author: {author}</p>
        <p className="text-gray-700 text-sm">Publisher: {publisher}</p>
        <p className="text-gray-700 text-sm">Date Published: {datePublished}</p>
        <p className="text-gray-700 text-sm">ISBN: {isbn}</p>
        <p className="text-gray-700 text-sm">Price: ${price.toFixed(2)}</p>
      </div>
      <div className="px-4 pt-2 pb-1">
        <Link href="/discover" passHref>
          <div className="cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            Discover More
          </div>
        </Link>

        <Link href="/understand" passHref>
          <div className="cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            Understand More
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
