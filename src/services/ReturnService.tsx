import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/return';

export const getNumberOfReturns = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/count-return-book`);
        console.log('Returns found:', response.data);
        return response.data;
    }   catch (error: any) {
        console.error('Error searching returns:', error.response ? error.response.data : error);
        throw error;
    }
}