import React, { useEffect } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import Footer from "../../components/Footer";
import { fetchTop8Books,fetchsortedBooks } from "../../services/BookServices";

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
    image: String | null;
}

const HomePage = () => {
    const [top8Books, setTop8Books] = React.useState<Book[]>([]);
    const [sortedBooks, setSortedBooks] = React.useState<Book[]>([]);

    useEffect(() => {
        fetchTop8Books()
            .then((books) => {
                console.log('Top 8 books:', books)
                setTop8Books(books);
            })
            .catch((error) => {
                console.error('Error fetching top 8 books:', error);
            });

        fetchsortedBooks()
            .then((books) => {
                console.log('Sorted books:', books)
                const top8sortedbook = books.slice(0, 8); 
                setSortedBooks(top8sortedbook);
            })
            .catch((error) => {
                console.error('Error fetching sorted books:', error);
            });
    }
    ,[])
    return (
        <main>
            <Header />

            <div className="container py-5">
                <div className="col-12 section-title text-start">
                    <h3>Most Popular Books</h3>
                </div>
                <div className="line"></div>
                <div className="container">
                    <div className="row">
                        {top8Books.map((book) => ( 
                            <div className="col-lg-3 col-md-6 col-sm-12 justify-content-center">
                                <div className="book-card my-5">
                                    <div className="book-img w-100">
                                        <img src={`data:image/jpeg;base64,${book.image}`} />
                                    </div>
                                    <div className="book-item text-center">
                                        <div className="book-item-info title">
                                            <span><strong>{book.title}</strong></span>
                                        </div>

                                        <div className="book-item-info author">
                                            <span className="text-capitalize"><strong>author: </strong></span>
                                            <span>{book.authorName}</span>
                                        </div>

                                        <div className="book-item-info edition-count">
                                            <span className="text-capitalize"><strong>total editions: </strong></span>
                                            <span>{book.edition}</span>
                                        </div>

                                        <div className="book-item-info year">
                                            <span className="text-capitalize"><strong>year: </strong></span>
                                            <span>{book.yearOfPublication}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="col-12 section-title text-start">
                    <h3>New Release Books</h3>
                </div>
                <div className="line"></div>
                <div className="container">
                    <div className="row">
                        {sortedBooks.map((book) => (
                            <div className="col-lg-3 col-md-6 col-sm-12 justify-content-center">
                                <div className="book-card my-5">
                                    <div className="book-img w-100">
                                        <img src={`data:image/jpeg;base64,${book.image}`} />
                                    </div>
                                    <div className="book-item text-center">
                                        <div className="book-item-info title">
                                            <span><strong>{book.title}</strong></span>
                                        </div>

                                        <div className="book-item-info author">
                                            <span className="text-capitalize"><strong>author: </strong></span>
                                            <span>{book.authorName}</span>
                                        </div>

                                        <div className="book-item-info edition-count">
                                            <span className="text-capitalize"><strong>total editions: </strong></span>
                                            <span>{book.edition}</span>
                                        </div>

                                        <div className="book-item-info year">
                                            <span className="text-capitalize"><strong>year: </strong></span>
                                            <span>{book.yearOfPublication}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default HomePage