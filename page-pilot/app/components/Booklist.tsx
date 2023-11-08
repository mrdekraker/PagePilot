import React, { FC } from 'react';

interface Book {
  id: string;
  title: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: FC<BookListProps> = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
};

export default BookList;
