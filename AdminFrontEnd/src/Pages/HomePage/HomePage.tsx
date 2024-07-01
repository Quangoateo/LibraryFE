import React, { useState, useEffect } from 'react';
import { Layout, Select } from "antd";
import "./homepage.css";
import { getAllBooks, getTop5Books, getTotalBookBorrowed, findNumberOfTimeBookIsBorrowedById, getTopBooksByGenre } from "../../services/BookService";
import { getAllUsers, getTop5Users, findNumberOfTimeUserBorrowById } from "../../services/UserService";
import { getNumberOfReturns } from "../../services/ReturnService";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const { Content, Footer } = Layout;
const { Option } = Select;

interface Book {
    id: number;
    title: string;
    authorName: string;
    publisher: string;
    genre: string; // Now it's a string with comma-separated genres
    isbn: string;
    edition: string;
    yearOfPublication: number;
    issued: number;
    quantity: number;
    available: number;
    image: string | null;
    borrowCount?: number;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    phoneNumber: string;
    username: string;
    gender: string;
    image: string | null;
    borrowCount?: number;
}

const genres = [
    "All", "History", "Fashion", "Politics", "Business", "Nonfiction", "Religion",
    "Biology", "Autobiography", "Fiction", "Economics", "Animals", "Games",
    "Poetry", "Music", "Education", "Sports", "Science", "Mystery", "Fantasy",
    "Food and Drink", "Travel", "Philosophy"
];

const Homepage: React.FC = () => {
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [booksReturnedToday, setBooksReturnedToday] = useState<number>(0);
    const [booksBorrowedToday, setBooksBorrowedToday] = useState<number>(0);

    const [topBooks, setTopBooks] = useState<Book[]>([]);
    const [topUsers, setTopUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedUsers = await getAllUsers();
                setTotalUsers(fetchedUsers.length);

                const fetchedBooks = await getAllBooks();
                setTotalBooks(fetchedBooks.length);

                const top5books = await getTop5Books();
                const booksWithBorrowCount = await Promise.all(
                    top5books.map(async (book: Book) => {
                        const borrowCount = await findNumberOfTimeBookIsBorrowedById(book.id);
                        return { ...book, borrowCount };
                    })
                );
                setTopBooks(booksWithBorrowCount);

                const top5users = await getTop5Users();
                const usersWithBorrowCount = await Promise.all(
                    top5users.map(async (user: User) => {
                        const borrowCount = await findNumberOfTimeUserBorrowById(user.id);
                        return { ...user, borrowCount };
                    })
                );
                setTopUsers(usersWithBorrowCount);

                const totalBookBorrowed = await getTotalBookBorrowed();
                setBooksBorrowedToday(totalBookBorrowed);

                const booksReturnedToday = await getNumberOfReturns();
                setBooksReturnedToday(booksReturnedToday);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleGenreChange = async (value: string) => {
        try {
            let filteredBooks: Book[] = [];
            if (value === "All") {
                filteredBooks = await getTop5Books();
            } else {
                filteredBooks = await getTopBooksByGenre(value);
            }
            const booksWithBorrowCount = await Promise.all(
                filteredBooks.map(async (book: Book) => {
                    const borrowCount = await findNumberOfTimeBookIsBorrowedById(book.id);
                    return { ...book, borrowCount };
                })
            );
            setTopBooks(booksWithBorrowCount);
        } catch (error) {
            console.error('Error fetching filtered books:', error);
        }
    };

    const topBooksChartData = {
        labels: topBooks.map(book => book.title),
        datasets: [
            {
                label: 'Borrow Count',
                data: topBooks.map(book => book.borrowCount || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const topUsersChartData = {
        labels: topUsers.map(user => `${user.firstName} ${user.lastName}`),
        datasets: [
            {
                label: 'Borrow Count',
                data: topUsers.map(user => user.borrowCount || 0),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)',
                hoverBorderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Library Statistics',
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <Layout>
            <Content>
                <div className="homepage">
                    <h1>Welcome to the homepage of our LIBRARY.</h1>

                    <div className="statistics-container">
                        <div className="statistic-box totalBooks">
                            <div>
                                <h3>Total Books</h3>
                                <p>{totalBooks}</p>
                            </div>
                            <i className="bx bx-book icon"></i>
                        </div>
                        <div className="statistic-box totalUsers">
                            <div>
                                <h3>Total Users</h3>
                                <p>{totalUsers}</p>
                            </div>
                            <i className="bx bx-user icon"></i>
                        </div>
                        <div className="statistic-box return">
                            <div>
                                <h3>Books Returned Today</h3>
                                <p>{booksReturnedToday}</p>
                            </div>
                            <i className="bx bx-calendar-check icon"></i>
                        </div>
                        <div className="statistic-box borrow">
                            <div>
                                <h3>Books Borrowed Today</h3>
                                <p>{booksBorrowedToday}</p>
                            </div>
                            <i className="bx bx-calendar-plus icon"></i>
                        </div>
                    </div>

                    <div className="TopBooks">
                        <h2>Top 5 Books</h2>
                        <div className="filter-container">
                            <Select
                                defaultValue="All"
                                onChange={handleGenreChange}
                                style={{ width: 200 }}
                            >
                                {genres.map(genre => (
                                    <Option key={genre} value={genre}>{genre}</Option>
                                ))}
                            </Select>
                        </div>
                        <Bar data={topBooksChartData} options={chartOptions} />
                    </div>

                    <div className="TopUsers">
                        <h2>Top 5 Users</h2>
                        <Bar data={topUsersChartData} options={chartOptions} />
                    </div>
                </div>
            </Content>

            <Footer style={{ textAlign: "center" }} className="footer">
                Copy Right: ©{new Date().getFullYear()} Created by Hailu
            </Footer>
        </Layout>
    );
};

export default Homepage;
