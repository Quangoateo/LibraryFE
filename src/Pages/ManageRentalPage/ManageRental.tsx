import { Layout } from "antd";
import { useEffect } from "react";
import moment from "moment"; // Import moment.js for date formatting
import { useState } from "react";
import { getAllRentals } from "../../services/RentalService";
import "./ManageRental.css";
import { Pagination } from "antd";
const { Content } = Layout;
interface Rental {
    readerId: number;
    firstName: string;
    lastName: string;
    bookTitle: string;
    reserveDate: string;
    dueDate: string;
}

const ManageRental = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastRental = currentPage * itemsPerPage;
    const indexOfFirstRental = indexOfLastRental - itemsPerPage;
    const currentRentals = rentals.slice(indexOfFirstRental, indexOfLastRental);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
      
    useEffect(() => {
        const initRentals = async () => {
            const fetchedRentals = await getAllRentals();
            console.log("Rentals:", JSON.stringify(fetchedRentals));
            setRentals(fetchedRentals);
            console.log();
        };
        initRentals();
    }, []);
    
    return (
        <div className="manageRentalPage">
            <Layout>
                <Layout>
                    <Content>
                        <h1>Manage Rental Page</h1>
                        <table className="rental-table">
                            <thead>
                                <tr>
                                    <th>Reader Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Book Title</th>
                                    <th>Reserve Date</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentRentals.map((rental, index) => (
                                <tr key={index + 1}>
                                    <td>{rental.readerId}</td>
                                    <td>{rental.firstName}</td>
                                    <td>{rental.lastName}</td>
                                    <td>{rental.bookTitle}</td>
                                    <td>{moment(rental.reserveDate).format('DD/MM/YYYY')}</td>
                                    <td>{moment(rental.dueDate).format('DD/MM/YYYY')}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="PaginationArea">
                            <Pagination
                                current={currentPage}
                                total={rentals.length} // Use filteredBooks.length here
                                pageSize={itemsPerPage}
                                onChange={handlePageChange}
                            />

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ManageRental;
