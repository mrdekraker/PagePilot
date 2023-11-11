'use client';

import React, { useEffect, useState } from 'react';
import Results from '../components/Results';

const Discover: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    // Get the selected genre from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');

    if (genre) {
      setSelectedGenre(decodeURIComponent(genre));
    }
  }, []);

  return (
    <div>
      <h1>Discover</h1>
      {selectedGenre && <p>Results for genre: {selectedGenre}</p>}
      <Results selectedGenre={selectedGenre} />
    </div>
  );
};

export default Discover;
