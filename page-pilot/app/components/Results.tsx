import React, { useEffect, useState } from 'react';

interface ResultsProps {
  selectedGenre: string | null;
}

const Results: React.FC<ResultsProps> = ({ selectedGenre }) => {
  const [results, setResults] = useState<{ title: string }[]>([]);

  useEffect(() => {
    // Fetch results based on the selected genre
    // Example: fetchResultsByGenre(selectedGenre);
    // Update the results state with the fetched data
    // setResults(fetchedData);
  }, [selectedGenre]);

  return (
    <div>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.title}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Results;
