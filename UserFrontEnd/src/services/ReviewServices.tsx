import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.appp/api/review-text';

export const updateReview = async (date: string, rating: number, review: string, bookID: number, readerID: number) => {
  try {
    const response = await axios.put(`${REST_API_BASE_URL}/update-review?date=${date}&rating=${rating}&review=${review}&bookID=${bookID}&readerID=${readerID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};