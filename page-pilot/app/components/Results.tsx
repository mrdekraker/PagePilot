import React from "react";
import Card from "./Card";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

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
  onDiscoverMoreClick: (book: any) => void; // Updated the function signature
}

const Results: React.FC<ResultsProps> = ({ bookData, onDiscoverMoreClick }) => {
  const limitedBookData = bookData.slice(0, 30);

  const renderImageOrPlaceholder = (book: any) => {
    const { imageLinks, title } = book.volumeInfo;
    const hasImage = imageLinks !== undefined;

    if (hasImage) {
      return (
        <img
          className="w-full object-contain"
          src={imageLinks.thumbnail}
          alt={title}
          style={{ height: "200px" }} // Set a fixed height for the images
        />
      );
    } else {
      return (
        <div className="flex flex-col w-full h-[208px] items-center justify-center border bg-gray-300 px-1">
          <span className="text-blue">Picture Not Available</span>
          <ExclamationTriangleIcon className="w-6" />
        </div>
      );
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {limitedBookData.map((book, index) => (
        <Card
          key={index}
          book={{
            title: book.volumeInfo.title,
            publisher: book.volumeInfo.publisher || "Unknown Publisher",
            publishedDate: book.volumeInfo.publishedDate || "Unknown Date",
            description:
              book.volumeInfo.description || "No description available",
            imageLinks: book.volumeInfo.imageLinks,
            authors: book.volumeInfo.authors || ["Unknown Author"],
          }}
          onDiscoverMoreClick={() => onDiscoverMoreClick(book)}
          renderImageOrPlaceholder={() => renderImageOrPlaceholder(book)}
        />
      ))}
    </div>
  );
};

export default Results;
