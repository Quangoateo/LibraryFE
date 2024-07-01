import React, { useState, useEffect } from "react";
import "./ManageBooks.css";
import { Modal, Layout, Button, Input, Checkbox, Form, Pagination, InputNumber, Space, message, Avatar, Switch, Upload, Row, Col } from "antd";
const { Content } = Layout;
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { getAllBooks, searchBooksByTitle, updateBook, deleteBook, addBook } from '../../services/BookService';
import { SearchOutlined } from "@ant-design/icons";

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

const blankBook: Book = {
  id: 0,
  title: "",
  authorName: "",
  publisher: "",
  genre: "",
  isbn: "",
  edition: "1st",
  yearOfPublication: 0,
  issued: 0,
  quantity: 0,
  available: 0,
  image: ""
};

const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookID, setSelectedBookID] = useState<number | null>(null);
  const [editingBook, setEditingBook] = useState(blankBook);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");


  // Effect to fetch all books from database
  useEffect(() => {
    const initBooks = async () => {
      const fetchedBooks = await getAllBooks();
      setBooks(fetchedBooks);
      console.log("Books:", fetchedBooks); // Logging the fetched books
      console.log('Image Data:', fetchedBooks.image);
    };

    initBooks();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  //get the current books
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleSearch = async () => {
    try {
      const results = await searchBooksByTitle(search); // Call searchBooksByTitle with the search query
      setBooks(results); // Update the books state with the search results
      message.success(`Found ${results.length} books matching "${search}"`);
    } catch (error) {
      message.error('Error searching books. Please try again.');
      console.error('Error searching books:', error);
    }
  };

  useEffect(() => {
    handleSearch(); // Trigger search when search query changes
  }, [search]); // Re-run effect whenever search query changes

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Updated logic to slice filteredBooks for current page display

  const handleEditChangeNumber = (value: number | null, name: string) => {
    setEditingBook(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement> | CheckboxChangeEvent) => {
    const { name, value, checked, type } = event.target as HTMLInputElement;
    setEditingBook({ ...editingBook, [name]: type === 'checkbox' ? checked : value });
  };

  const startEdit = (bookID: number) => {
    const bookToEdit = books.find(book => book.id === bookID);
    setEditingBook(bookToEdit || blankBook);
    setSelectedBookID(bookID);
    setIsAdding(false);
  };

  const handleRowClick = (bookID: number) => {
    if (selectedBookID === bookID) {
      setSelectedBookID(null);
      setEditingBook(blankBook);
    } else {
      startEdit(bookID);
    }
  };

  const removeBook = async (bookID: number) => {
    try {
      await deleteBook(bookID); // Use the service function to delete the book

      // Remove the book from the local state only if the server deletion was successful
      setBooks(books.filter(book => book.id !== bookID));
      setSelectedBookID(null); // Clear selected book after removal
      setEditingBook(blankBook);
    } catch (error) {
      console.error('An error occurred while deleting the book:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingBook(blankBook); // Ensure the form is reset/blank for a new book
  };

  const handleAddOk = async () => {
    setIsModalVisible(false);
    // Convert the boolean value to an integer
    const available = editingBook.available ? 1 : 0;
    const formData = new FormData();
    formData.append('title', editingBook.title);
    formData.append('image', String(editingBook.image));
    formData.append('authorName', editingBook.authorName);
    formData.append('publisher', editingBook.publisher);
    formData.append('genre', editingBook.genre);
    formData.append('isbn', editingBook.isbn);
    formData.append('edition', editingBook.edition);
    formData.append('issued', String(editingBook.issued));
    formData.append('yearOfPublication', String(editingBook.yearOfPublication));
    formData.append('quantity', String(editingBook.quantity));
    formData.append('available', String(available));
    try {
      // Adding a new book
      const addedBook = await addBook(formData); // Use the service function to add the book
      setBooks([...books, addedBook]); // Add the returned book to the local state
    } catch (error) {
      console.error('An error occurred while adding the book:', error);
    }

    setEditingBook(blankBook);
  };
  const handleAddCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditCancel = () => {
    setEditingBook(blankBook);
    setIsAdding(false);
    setSelectedBookID(null);
  };
  // Modify handleEditSave function to send updated book data including the image
  const handleEditSave = async () => {
    // Form data to send to the backend
    const formData = new FormData();
    formData.append('title', editingBook.title);
    formData.append('image', String(editingBook.image));
    formData.append('authorName', editingBook.authorName);
    formData.append('publisher', editingBook.publisher);
    formData.append('genre', editingBook.genre);
    formData.append('isbn', editingBook.isbn);
    formData.append('edition', editingBook.edition);
    formData.append('issued', String(editingBook.issued));
    formData.append('yearOfPublication', String(editingBook.yearOfPublication));
    formData.append('quantity', String(editingBook.quantity));
    formData.append('available', String(editingBook.available));
    
    try {
      const updatedBook = await updateBook(editingBook.id, formData); // Send data to backend
      // Update the state if needed
      // Reset state variables
      setEditingBook(blankBook);
      setIsAdding(false);
      setSelectedBookID(null);
    
      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => {
          if (book.id === updatedBook.id) {
            return updatedBook;
          }
          return book;
        });
        return updatedBooks;
      });
      // Show success message or handle response from the backend
    } catch (error) {
      // Handle errors
    }
  };

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setEditingBook(prevState => ({ ...prevState, image: base64String.split(',')[1] }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <div className="bookmanagmentpage">
            <div className="bookmanagementTitle">
              <h1 >Book Management Page</h1>
            </div>
            <Space className="search-bar" style={{ marginBottom: 16 }}>
              <Input
                placeholder="Search by title"
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                onPressEnter={handleSearch} // Call handleSearch when Enter key is pressed
              />
              <Button type="primary" onClick={handleSearch}>Search</Button> {/* Button to trigger search */}
            </Space>
            <table>
              <thead>
                <tr>
                  <th>BookID</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Author Name</th>
                  <th>Publisher</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Edition</th>
                  <th>Issued</th>
                  <th>Year</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  <th>Action</th> {/* Added table header for the Action column */}
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr key={book.id} onClick={() => handleRowClick(book.id)} className={selectedBookID === book.id ? "selected" : ""}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td className="image-column">
                      {book.image && (
                        <img src={`data:image/jpeg;base64,${book.image}`} alt="Book Cover" />
                      )}
                    </td>
                    <td>{book.authorName}</td>
                    <td>{book.publisher}</td>
                    <td className="genre-column">{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.edition}</td>
                    <td>{book.issued}</td>
                    <td>{book.yearOfPublication}</td>
                    <td>{book.quantity}</td>
                    <td>{book.available ? "Yes" : "No"}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); removeBook(book.id); }} className="remove-button">
                        <i className="bx bx-trash"></i> {/* Using Boxicons trash icon */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              total={books.length} // Use filteredBooks.length here
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />

            {/* Edit Book Modal */}
            <Modal
              title="Edit Book"
              visible={isAdding || selectedBookID !== null}
              onOk={handleEditSave}
              onCancel={handleEditCancel}
            >
              <Form>
                {/* For each Form.Item, ensure the Input has its value bound to editingBook */}
                <Form.Item label="Title">
                  <Input
                    name="title"
                    value={editingBook.title} // Bind value to editingBook.title
                    onChange={handleEditChange}
                  />
                </Form.Item>
                
                <Form.Item label="Image">
                  <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      if (file) {
                        handleAvatarChange(file);
                      }
                      return false; // Prevent default upload behavior
                    }}
                  >
                    {editingBook.image ? (
                      <Avatar src={`data:image/jpeg;base64,${editingBook.image}`} size={80} />
                    ) : (
                      <div>
                        <i className="bx bxs-user"></i>
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item label="AuthorName">
                  <Input
                    name="authorName"
                    value={editingBook.authorName} // Bind value
                    onChange={handleEditChange}
                  />
                </Form.Item>

                <Form.Item label="Publisher">
                  <Input
                    name="publisher"
                    value={editingBook.publisher} // Bind value
                    onChange={handleEditChange}
                  />
                </Form.Item>

                <Form.Item label="Genre">
                  <Input
                    name="genre"
                    value={editingBook.genre} // Bind value
                    onChange={handleEditChange}
                  />
                </Form.Item>

                <Form.Item label="Isbn">
                  <Input
                    name="isbn"
                    value={editingBook.isbn} // Bind value
                    onChange={handleEditChange}
                  />
                </Form.Item>

                <Form.Item label="Edition">
                  <Input
                    name="edition"
                    value={editingBook.edition} // Bind value
                    onChange={handleEditChange}
                  />
                </Form.Item>

                <Form.Item label="Issued">
                  <InputNumber
                    name="issued"
                    value={editingBook.issued} // Bind value
                    onChange={(value) => handleEditChangeNumber(value, 'issued')}
                  />
                </Form.Item>

                <Form.Item label="Year">
                  <InputNumber
                    name="year"
                    value={editingBook.yearOfPublication} // Bind value
                    onChange={(value) => handleEditChangeNumber(value, 'yearOfPublication')}
                  />
                </Form.Item>

                <Form.Item label="Quantity">
                  <InputNumber
                    name="quantity"
                    value={editingBook.quantity} // Bind value
                    onChange={(value) => handleEditChangeNumber(value, 'quantity')}
                  />
                </Form.Item>

                <Form.Item label="Available">
                  <Switch
                    checked={editingBook.available == 0 ? false : true} // Bind checked state
                    onChange={(checked) => setEditingBook({ ...editingBook, available: checked == false ? 0 : 1 })}
                  />
                </Form.Item>
              </Form>
            </Modal>

            {/* Add Book Modal */}
            <Modal
              title="Add New Book"
              visible={isModalVisible}
              onOk={handleAddOk}
              onCancel={handleAddCancel}
            >
              <Form form={form}>
                <Form.Item label="Title">
                  <Input name="title" placeholder="Title" value={editingBook.title} onChange={handleEditChange} />
                </Form.Item>
                {/*Add image*/}
                <Form.Item label="Image">
                  <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      if (file) {
                        handleAvatarChange(file);
                      }
                      return false; // Prevent default upload behavior
                    }}
                  >
                    {editingBook.image ? (
                      <Avatar src={`data:image/jpeg;base64,${editingBook.image}`} size={80} />
                    ) : (
                      <div>
                        <i className="bx bxs-user"></i>
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Author Name">
                      <Input name="authorName" placeholder="Author Name" value={editingBook.authorName} onChange={handleEditChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Publisher">
                      <Input name="publisher" placeholder="Publisher" value={editingBook.publisher} onChange={handleEditChange} />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Genre">
                      <Input name="genre" placeholder="Genre" value={editingBook.genre} onChange={handleEditChange} />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item label="ISBN">
                      <Input name="isbn" placeholder="International standard book number" value={editingBook.isbn} onChange={handleEditChange} />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Issued">
                      <InputNumber name="issued" placeholder="Issued" value={editingBook.issued} onChange={(value) => handleEditChangeNumber(value, 'issued')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Year">
                      <InputNumber name="year" placeholder="Year" value={editingBook.yearOfPublication} onChange={(value) => handleEditChangeNumber(value, 'year')} />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Edition">
                      <Input name="edition" placeholder="Edition" value={editingBook.edition} onChange={handleEditChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Quantity">
                      <InputNumber name="quantity" placeholder="Quantity" value={editingBook.quantity} onChange={(value) => handleEditChangeNumber(value, 'quantity')} />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item label="Available" valuePropName="checked">
                  <Checkbox name="available" checked={editingBook.available == 0 ? false : true} onChange={handleEditChange} />
                </Form.Item>
              </Form>
            </Modal>


            {!isAdding && selectedBookID === null && (
              <div className="action-buttons">
                <button onClick={showModal}><b>Add New Book</b></button>
              </div>
            )}

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageBooks;
