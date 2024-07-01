import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import "./SearchPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getAllBooks, searchBooksByTitle } from "../../services/BookServices";
import { Pagination } from '@mui/material';
import { lendBook } from "../../services/RentServices";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { addNotification } from "../../services/NotificationServices";
import { addFavoriteBook } from "../../services/FavoriteBookServices";

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

const genres = [
    "History", "Fashion", "Politics", "Business", "Nonfiction", "Religion",
    "Biology", "Autobiography", "Fiction", "Economics", "Animals", "Games",
    "Poetry", "Music", "Education", "Sports", "Science", "Mystery", "Fantasy",
    "Food and Drink", "Travel", "Philosophy"
];

const authors = ["Jim  Murphy", "Kazuno Kohara", "Edwin Benson", "Larry Niven","Colin Dexter", 
    "Merlin Coverley", "Clive Gifford","Fulton J. Sheen","Lois Ehlert","Calestous Juma",
    "Gustavo Gorriti","Robert J. Shiller","Marilyn Butler","Mark Lee","B. Mark Smith","Rocky McElveen",
];

const years = ["2024", "2023", "2022", "2021", "2020"];

const SearchPage = () => {
    let navigate = useNavigate();

    const readerData = JSON.parse(localStorage.getItem('ReaderData') || '{}');
    const firstName = readerData.firstName;
    const lastName = readerData.lastName;
    const reserveDate = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Add two weeks to today's date
    const dueDateString = dueDate.toISOString().slice(0, 10); // Get due date in 'YYYY-MM-DD' format

    const [books, setBooks] = useState<Book[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]); // Maintain a separate state for all books
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // State for selected genres
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]); // State for selected authors
    const [selectedYears, setSelectedYears] = useState<string[]>([]); // State for selected years
    const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null); // State for selected availability

    const date = new Date() ;
    const vietnamTime = new Date(date.getTime() + (7 * 60 * 60 * 1000)); // Adding 7 hours for Vietnam timezone
    const dateTime = vietnamTime.toISOString().split('.')[0];

    useEffect(() => {
        // Fetch all books when the component mounts
        const getBook = async () => {
            const response = await getAllBooks();
            setBooks(response);
            setAllBooks(response); // Save the original list of books
        };
        getBook();
    },[]); // Passing an empty dependency array

    //Pagination page
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    //get the current books
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleBorrowButton = async (firstName: string, lastName: string, bookID:number, bookTitle: string, reserveDate: string, dueDate: string) => {
        try {
            console.log(firstName, lastName, bookTitle, reserveDate, dueDateString);

            const response = await lendBook(firstName, lastName, bookTitle, reserveDate, dueDate);
            console.log(response);

            // Add a notification to the reader
            const message = `You have successfully borrowed the book: ${bookTitle}`;
            await addNotification(readerData.id, bookID, message, dateTime);

            setTimeout(() => {
                toast.success('Book borrowed successfully');
            }, 5000);

            navigate('/confirm');
            // Handle success, maybe show a success message
        } catch (error: any) {
            console.error('Error lending book:', error);
            toast.error(error.response.data.message);
            // Show an error message to the user
        }
    };

    const handleResetSearch = () => {
        // Reset the displayed books to show all books
        setBooks(allBooks);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            // If the search term is empty, reset the displayed books to show all books
            handleResetSearch();
            return;
        }

        try {
            const response = await searchBooksByTitle(searchTerm);
            setBooks(response);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const [searchSuggestions, setSearchSuggestions] = useState<Book[]>([]);

    const handleSearch = async (term: string) => {
        try {
            const response = await searchBooksByTitle(term);
            setSearchSuggestions(response);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term); // Fetch search suggestions as the user types
        setShowSuggestions(true); // Show suggestions when typing
    };

    const handleSelectSuggestion = (book: Book) => {
        setSearchTerm(book.title);
        setSearchSuggestions([]); // Clear search suggestions
        setShowSuggestions(false);
        setBooks([book]); // Show only the selected book
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false); // Hide suggestions when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    const handleFavoriteButton = async (bookID: number, readerID: number) => {
        try {
            const response = await addFavoriteBook(bookID, readerID);
            console.log(response);
            toast.success('Book added to favorites successfully');
        } catch (error: any) {
            console.error('Error adding favorite book:', error);
            toast.error(error.response.data.message);
        }
    }

    const filterBooks = () => {
        let filteredBooks = allBooks;

        if (selectedGenres.length > 0) {
            filteredBooks = filteredBooks.filter(book => {
                const bookGenres = book.genre.split(",").map(genre => genre.trim());
                return selectedGenres.every(selectedGenre => bookGenres.includes(selectedGenre));
            });
        }

        if (selectedAuthors.length > 0) {
            filteredBooks = filteredBooks.filter(book => selectedAuthors.includes(book.authorName));
        }

        if (selectedYears.length > 0) {
            filteredBooks = filteredBooks.filter(book => selectedYears.includes(book.yearOfPublication.toString()));
        }

        if (selectedAvailability !== null) {
            filteredBooks = filteredBooks.filter(book => book.available > 0 === selectedAvailability);
        }

        setBooks(filteredBooks);
    };

    useEffect(() => {
        filterBooks();
    }, [selectedGenres, selectedAuthors, selectedYears, selectedAvailability]);

    const handleGenreCheckboxChange = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleAuthorCheckboxChange = (author: string) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter(a => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    const handleYearCheckboxChange = (year: string) => {
        if (selectedYears.includes(year)) {
            setSelectedYears(selectedYears.filter(y => y !== year));
        } else {
            setSelectedYears([...selectedYears, year]);
        }
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedAvailability(value === "available" ? true : value === "notAvailable" ? false : null);
    };

    return (
        <main>
            <Navbar />
            <section>
                <div className="banner-search">
                    <div className='banner-text-search'>
                        <h2>find your book of choice</h2>
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 pt-5">
                            {/* FILTER ITEMS SECTION */}
                            <div className="filter-item-search">
                                <h5>Filter by Genre</h5>
                                <div className="filter-genre">
                                    {genres.map((genre) => (
                                        <div key={genre} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={genre}
                                                checked={selectedGenres.includes(genre)}
                                                onChange={() => handleGenreCheckboxChange(genre)}
                                            />
                                            <label className="form-check-label" htmlFor={genre}>{genre}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-item-search">
                                <h5>Filter by Author</h5>
                                <div className="filter-author">
                                    {authors.map((author) => (
                                        <div key={author} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={author}
                                                checked={selectedAuthors.includes(author)}
                                                onChange={() => handleAuthorCheckboxChange(author)}
                                            />
                                            <label className="form-check-label" htmlFor={author}>{author}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-item-search">
                                <h5>Filter by Year</h5>
                                <div className="filter-year">
                                    {years.map((year) => (
                                        <div key={year} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={year}
                                                checked={selectedYears.includes(year)}
                                                onChange={() => handleYearCheckboxChange(year)}
                                            />
                                            <label className="form-check-label" htmlFor={year}>{year}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-item-search">
                                <h5>Filter by Availability</h5>
                                <div className="filter-availability">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="available"
                                            name="availability"
                                            value="available"
                                            checked={selectedAvailability === true}
                                            onChange={handleAvailabilityChange}
                                        />
                                        <label className="form-check-label" htmlFor="available">Available</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="notAvailable"
                                            name="availability"
                                            value="notAvailable"
                                            checked={selectedAvailability === false}
                                            onChange={handleAvailabilityChange}
                                        />
                                        <label className="form-check-label" htmlFor="notAvailable">Not Available</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="all"
                                            name="availability"
                                            value="all"
                                            checked={selectedAvailability === null}
                                            onChange={handleAvailabilityChange}
                                        />
                                        <label className="form-check-label" htmlFor="all">All</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 pt-5">
                            <div className="search-form">
                                <div className="container d-flex justify-content-center">
                                    <div className="search-form-content">
                                        <form className="search-form" onSubmit={handleSubmit}>
                                            <div className="search-form-elem d-flex justify-content-between bg-white">
                                                <input
                                                    type="text"
                                                    className="form-control border-0"
                                                    placeholder="Enter your book ..."
                                                    value={searchTerm}
                                                    onChange={handleChange}
                                                >
                                                </input>
                                                <button type="submit" className="d-flex align-items-center">
                                                    <FaMagnifyingGlass size={20} style={{ color: '#829E8E', marginLeft: '8px' }} />
                                                </button>
                                            </div>
                                            {showSuggestions && (
                                                <div ref={suggestionsRef} className="search-suggestions">
                                                    <ul>
                                                        {searchSuggestions.map((book) => (
                                                            <li key={book.id} onClick={() => handleSelectSuggestion(book)}>{book.title}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="divider-search"></div>
                            <div className="main-content">
                                {/* Book Cards */}
                                {currentBooks.map((book) => (
                                    <div className="card book-card" key={book.id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={`data:image/jpeg;base64,${book.image}`} className="img-fluid rounded-start" alt="Book Title" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title-search">
                                                        <Link to="#">{book.title}</Link>
                                                    </h5>
                                                    <p className="card-text-search author"><strong>Author:</strong> {book.authorName}</p>
                                                    <p className="card-text-search publisher"><strong>Publisher:</strong> {book.publisher}</p>
                                                    <p className="card-text-search genre"><strong>Genre:</strong> {book.genre}</p>
                                                    <p className="card-text-search isbn"><strong>ISBN:</strong> {book.isbn}</p>
                                                    <p className="card-text-search edition"><strong>Edition:</strong> {book.edition}</p>
                                                    <p className="card-text-search yearOfPublication"><strong>Year Of Publication:</strong> {book.yearOfPublication}</p>
                                                    <p className="card-text-search issued"><strong>Issued:</strong> {book.issued}</p>
                                                    <p className="card-text-search quantity"><strong>Quantity:</strong> {book.available}</p>
                                                    <p className="card-text-search available"><strong>Available:</strong> {book.available == 0 ? "No" : "Yes"}</p>

                                                    {/* Add other book details */}
                                                    <div className="card-btn">
                                                        <Button variant="secondary" className="favorite-btn" onClick={() => handleFavoriteButton(book.id, readerData.id)}>Add to favorite</Button>
                                                        <Button variant="secondary" className="favorite-btn" onClick={() => handleBorrowButton(firstName, lastName, book.id, book.title, reserveDate, dueDateString)}>Borrow</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pagination">
                                    {/* Pagination */}
                                    <Pagination
                                        count={Math.ceil(books.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> {/* Closing tag for the outer row div */}
                </div>
                <ToastContainer />
            </section>
            <Footer />
        </main>
    )
}

export default SearchPage;
