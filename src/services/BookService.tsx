import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/books';

export const addBook = async (bookData: any) => {
    try {
      const response = await axios.post(REST_API_BASE_URL, bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Book added successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error adding book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const deleteBook = async (bookId: any) => {
    try {
      await axios.delete(REST_API_BASE_URL+`/${bookId}`);
      console.log('Book deleted successfully');
    } catch (error: any) {
      console.error('Error deleting book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const updateBook = async (bookId: any, bookData: any) => {
    try {
      const response = await axios.put(REST_API_BASE_URL+ `/${bookId}`, bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Book updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const searchBooksByTitle = async (title: any) => {
    try {
      const response = await axios.get(REST_API_BASE_URL+`/search`, {
        params: { title },
      });
      console.log('Books found:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error searching books:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const getAllBooks = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}`);
      console.log(response.data);
      return response.data; // Assuming the response contains an array of book objects
    } catch (error: any) {
      console.error('Error retrieving books:', error.response ? error.response.data : error);
      throw error;
    }
  };

  export const getTop5Books = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/top5`);
      console.log(response.data);
      return response.data; // Assuming the response contains an array of book objects
    }
    catch (error: any) {
      console.error('Error retrieving books:', error.response ? error.response.data : error);
      throw error;
    }
  }

export const getTopBooksByGenre = async (genre: any) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/top-books-by-genre/${genre}`);
    console.log(response.data);
    return response.data; // Assuming the response contains an array of book objects
  }
  catch (error: any) {
    console.error('Error retrieving books:', error.response ? error.response.data : error);
    throw error;
  }
}

export const getTotalBookBorrowed = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/totalReservedToday`);
    console.log(response.data);
    return response.data; // Assuming the response contains an array of book objects
  }
  catch (error: any) {
    console.error('Error retrieving books:', error.response ? error.response.data : error);
    throw error;
  }
}

export const findNumberOfTimeBookIsBorrowedById = async (bookId: any) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/number-of-time-borrow/${bookId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching number of times book is borrowed:', error.response ? error.response.data : error);
    throw error;
  }
};

  
  