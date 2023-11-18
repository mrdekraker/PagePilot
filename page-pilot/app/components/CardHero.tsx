import React from "react";

type BookProps = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks?: { thumbnail: string };
  infoLink?: string;
};

const CardHero: React.FC<BookProps> = ({
  title,
  authors,
  publisher,
  publishedDate,
  description,
  imageLinks,
  infoLink,
}) => {
  return (
    <div
      className="border border-ocean-deep rounded-md shadow-xl flex flex-row items-center py-6"
      style={{ maxWidth: "800px" }}>
      {/* Render the image if available */}
      {imageLinks && (
        <img
          className="w-32 h-48 md:w-48 md:h-72 lg:w-64 lg:h-96 object-cover"
          src={imageLinks.thumbnail}
          alt={title}
        />
      )}

      {/* Middle Column */}
      <div className="flex flex-col px-2">
        {/* Your styling and layout for the detailed book information */}
        {/* Use the passed props to display the detailed book data */}
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-700 mb-2">Author(s): {authors.join(", ")}</p>
        <p className="text-gray-700 mb-2">Publisher: {publisher}</p>
        <p className="text-gray-700 mb-2">Published Date: {publishedDate}</p>
        <p className="text-gray-700 mb-2">Description: {description}</p>

        {/* Flex container for links */}
        <div className="flex justify-center space-x-4">
          {/* Render the "More Info" link if available */}
          {infoLink && (
            <div className="text-center cursor-pointer inline-block bg-cyan-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-ocean-deep hover:text-white">
              <a href={infoLink} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          )}

          {/* "Understand More" Button */}
          <div
            className="text-center cursor-pointer inline-block bg-cyan-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-ocean-deep hover:text-white"
            // onClick={handleClickDiscoverMore}
          >
            Understand More
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
