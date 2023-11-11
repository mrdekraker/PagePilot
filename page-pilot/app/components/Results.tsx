import React from 'react';

interface ResultsProps {
  results: { title: string }[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
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