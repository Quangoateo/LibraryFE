import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/reader-notifications';

export const getNotifications = async (readerID: number) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${readerID}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting notifications:', error);
        throw error;
    }
};

export const addNotification = async (readerID: number, bookID: number, message: string, dateTime: string) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}`, { readerID, bookID,message, dateTime });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
}

export const markNotificationAsRead = async (notificationID: number) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/${notificationID}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
}