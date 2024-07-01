import{ useEffect, useState } from "react";
import './ReviewPage.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { getAllBooks } from "../../services/BookServices";
import { updateReview } from "../../services/ReviewServices";
import { toast, ToastContainer } from 'react-toastify';

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

interface SelectedBook {
    id: number;
    title: string;
}

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}


const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span
            key={i}
            className={i <= rating ? "star filled" : "star"}
            onClick={() => onRatingChange(i)}
            style={{ fontSize: "58px", cursor: "pointer", color: i <= rating ? "#EFB61F" : "black" }}
          >
            ★
          </span>
        );
      }
      return stars;
    };
  
    return <div className="star-rating">{renderStars()}</div>;
  };


const ReviewPage = () => {
    const [reviewText, setReviewText] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [rating, setRating] = useState(0);
    const [selectedBook, setSelectedBook] = useState<SelectedBook | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const booksData = await getAllBooks(); // Assuming getAllBooks function fetches all books
            setBooks(booksData);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (reviewText.trim() !== '' && selectedBook && rating > 0) {
            // Assuming you have bookID and readerID available
            const bookID = selectedBook.id;

            const readerID = JSON.parse(localStorage.getItem('ReaderData') || '{}').id;


            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // pad with leading zero if less than 10
            const day = String(date.getDate()).padStart(2, '0'); // pad with leading zero if less than 10
            const dateStr = `${year}-${month}-${day}`;

            // Update the review with selected book, rating, and review text
            updateReview(dateStr, rating, reviewText, bookID, readerID)
                .then(() => {
                    setReviewText('');
                    setSelectedBook(null);
                    setRating(0);
                })
                .catch(error => {
                    console.error("Error updating review:", error);
                });
            toast.success('Review submitted successfully');
        }
    };


    const buttonStyle = {
        backgroundColor: '#829E8E', // Custom background color
        borderColor: '#829E8E', // Border color
        color: '#fff', // Text color
    };


    return (
        <>
            <Navbar />

            <section>
                <div className="banner-review">
                    <div className='banner-text-review'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-review fs-18 fw-3'>
                            Dive into our extensive collection of books and find the perfect read for every mood and moment.
                            <br />
                            Whether you're looking for thrilling adventures, heartwarming stories, or insightful knowledge,
                            we have something special just for you.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Our Location</h2>
                        <div id="map" className="map-container w-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4307.625216204096!2d106.61234525058096!3d11.106218756017238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cc319fa2961d%3A0x7d4b41a06aa94b0!2sVietnam%20-%20Germany%20University!5e1!3m2!1sen!2s!4v1656821071894!5m2!1sen!2s"
                                
                                style={{ border: "0" }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <div className="col-md-6 confirm-column">
                        <h2>Write a Review</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="bookSelect" className="form-label">Select a Book:</label>
                                <select
                                    id="bookSelect"
                                    className="form-select"
                                    value={selectedBook ? selectedBook.title : '0'}
                                    onChange={(e) => {
                                        const book = books.find(book => book.title === e.target.value);
                                        if (book) {
                                            setSelectedBook({ id: book.id, title: book.title });
                                        }
                                    }}
                                >
                                    <option value="0">Select a book...</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.title}>{book.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="ratingSelect" className="form-label">Your Rating:</label>
                                <StarRating
                                    rating={rating}
                                    onRatingChange={(value) => setRating(value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="reviewText" className="form-label">Your Review:</label>
                                <textarea
                                    id="reviewText"
                                    className="form-control"
                                    rows={8}
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <button type="submit" className="btn" style={buttonStyle}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />  

            <Footer />
        </>
    );
}

export default ReviewPage;
