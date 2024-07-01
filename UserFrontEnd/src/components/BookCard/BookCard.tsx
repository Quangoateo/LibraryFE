import React from "react";
import './BookCard.css';

interface Book {
    id: number;
    title: string;
    authorName: string;
    publisher: string;
    genre: string;
    isbn: string;
    edition: string;
    yearOfPublication: number;
    issued: number;
    quantity: number;
    available: number;
    image: string | null;
}

interface Props {
    book: Book;
    onDelete: (bookId: number) => void;
}

const BookCard: React.FC<Props> = ({ book, onDelete }) => {
    const handleDelete = () => {
        onDelete(book.id);
    };

    return (
        <div className="book-card">
            {book.image && <img src={`data:image/jpeg;base64,${book.image}`} alt={book.title} className="book-image" />}
            <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p>Author: {book.authorName}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Genre: {book.genre}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Edition: {book.edition}</p>
                <p>Year of Publication: {book.yearOfPublication}</p>
                <p>Available: {book.available}</p>
            </div>
            <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
    );
}

export default BookCard;
