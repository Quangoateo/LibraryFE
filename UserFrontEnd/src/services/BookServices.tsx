import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/books';

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}`);
    return response.data; // Assuming the response contains an array of book objects
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error retrieving books:', error.response ? error.response.data : error);
    } else {
      console.error('Error retrieving books:', error);
    }
    throw error;
  }
};

export const searchBooksByTitle = async (title: string) => {
  try {
    const response = await axios.get(REST_API_BASE_URL+`/search`, {
      params: { title },
    });
    console.log('Books found:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching books:', error.response ? error.response.data : error);
    } else {
      console.error('Error searching books:', error);
    }
    throw error;
  }
};

export const fetchTop8Books = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL+`/top8`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching top 8 books:', error.response ? error.response.data : error);
    } else {
      console.error('Error fetching top 8 books:', error);
    }
    throw error;
  }
}

export const fetchsortedBooks = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL+`/sort-by-release-date`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching sorted books:', error.response ? error.response.data : error);
    } else {
      console.error('Error fetching sorted books:', error);
    }
    throw error;
  }
}