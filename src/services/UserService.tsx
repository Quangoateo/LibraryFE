import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/readersinfo';



export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}`);
      console.log(response.data);
      return response.data; // Assuming the response contains an array of book objects
    } catch (error: any) {
      console.error('Error retrieving users:', error.response ? error.response.data : error);
      throw error;
    }
  };

export const getTop5Users = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/top5`);
    console.log(response.data);
    return response.data; // Assuming the response contains an array of book objects
  } catch (error: any) {
    console.error('Error retrieving users:', error.response ? error.response.data : error);
    throw error;
  }
}

export const findNumberOfTimeUserBorrowById = async (userId: any)=> {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/number-of-time-user-borrow/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching number of times user borrowed books:', error.response ? error.response.data : error);
    throw error;
  }
};