import axios from 'axios';
const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/reader-notifications';
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/details`);
    console.log(response.data);
    return response.data; // Assuming the response contains an array of notification objects
  } catch (error: any) {
    console.error('Error retrieving notifications:', error.response ? error.response.data : error);
    throw error;
  }
}






























