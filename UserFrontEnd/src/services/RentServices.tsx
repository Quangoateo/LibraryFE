import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/rent';

export const lendBook = async (firstName: string, lastName: string, bookTitle: string, reserveDate: string, dueDate: string) => {
    try {
      const response = await axios.post(`${REST_API_BASE_URL}/lend-book?firstName=${firstName}&lastName=${lastName}&bookTitle=${bookTitle}&reserveDate=${reserveDate}&dueDate=${dueDate}`)
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error lending book:', error.response ? error.response.data : error);
      } else {
        console.error('Error lending book:', error);
      }
      throw error;
    }
  };

  export const getBorrowedBooksByUser = async (userId: number) => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/user-borrowed-books/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting borrowed books:', error);
      throw error;
    }
  };
