'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const navheight = "74.9609px";
  const [text, setText] = useState('');
  const welcomeText = "Welcome to PagePilot";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let i = 0;

    const typeWriter = () => {
      if (i < welcomeText.length) {
        setText((prevText) => prevText + welcomeText.charAt(i));
        i++;
        timer = setTimeout(typeWriter, 150);
      }
    };

    typeWriter();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="flex flex-col justify-center items-center" style={{ minHeight: `calc(100vh - ${navheight})` }}>
      <div className="text-center mb-8">
        <h1 className="text-6xl">{text}</h1>
        <p className="text-2xl">Your all-in-one book companion.</p>
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold">Search for Books</h2>
        <div className="flex items-center rounded-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full py-2 px-3 text-gray-700"
          />
          <button className="bg-blue-500 text-white py-2 px-4 hover-bg-blue-600">
            Search
          </button>
        </div>
      </div>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
    </main>
  );
}
