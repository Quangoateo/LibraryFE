import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/favorite-books';

export const addFavoriteBook = async (bookID: number, readerID: number) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, { bookID, readerID });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error('Error adding favorite book:', error.response ? error.response.data : error);
        } else {
        console.error('Error adding favorite book:', error);
        }
        throw error;
    }
}

export const getAllFavoriteBooks = async (readerID: number) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${readerID}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error('Error getting favorite books:', error.response ? error.response.data : error);
        } else {
        console.error('Error getting favorite books:', error);
        }
        throw error;
    }
}

export const deleteFavoriteBook = async (bookID: number, readerID: number) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/${bookID}/${readerID}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error('Error deleting favorite book:', error.response ? error.response.data : error);
        } else {
        console.error('Error deleting favorite book:', error);
        }
        throw error;
    }
}
