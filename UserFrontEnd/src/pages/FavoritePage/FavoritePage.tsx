import { getAllFavoriteBooks } from "../../services/FavoriteBookServices";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import { deleteFavoriteBook } from "../../services/FavoriteBookServices";
import Footer from "../../components/Footer";

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

const FavoritePage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const readerData = JSON.parse(localStorage.getItem('ReaderData') || '{}');
    
    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            try {
                const readerID = readerData.id; // Replace with the actual reader ID
                const favoriteBooks = await getAllFavoriteBooks(readerID);
                setBooks(favoriteBooks);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch favorite books");
                setLoading(false);
            }
        };

        fetchFavoriteBooks();
    }, [books]);

    const handleDelete = async (bookId: number) => {
        try {
            const readerID = JSON.parse(localStorage.getItem('ReaderData') || '{}').id;
            await deleteFavoriteBook(bookId, readerID);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            console.error("Failed to delete favorite book", error);
            setError("Failed to delete favorite book");
        }
    };

    return (
        <main>
            <Navbar />
            <section>
                <div className="banner-search">
                    <div className='banner-text-search'>
                        <h2>Your favorite books</h2>
                        <br />
                        <p className='header-text fs-18 fw-3'>
                            Dive into our extensive collection of books and find the perfect read for every mood and moment.
                            <br />
                            Whether you're looking for thrilling adventures, heartwarming stories, or insightful knowledge,
                            we have something special just for you.
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="favorite-books-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : books.length === 0 ? (
                        <p>No favorite books found</p>
                    ) : (
                        <div className="books-grid">
                            {books.map((book) => (
                                <BookCard key={book.id} book={book} onDelete={handleDelete}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default FavoritePage;