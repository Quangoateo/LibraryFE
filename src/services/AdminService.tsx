import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/admins';

// export const listAdmins = () => {
//     return axios.get(REST_API_BASE_URL);
// }

export const registerAdmin = async (dataToSend: any) => { // Mark the function as async
    try {
        const response = await axios.post(REST_API_BASE_URL, dataToSend, {
            headers: {
                'Content-Type': 'application/json', // This is important
            },
        });
        return response;
    } catch (error) {
        // Handle errors
        console.error('Error registering admin:', error);
        throw error; // Re-throw the error for the caller to handle if necessary
    }
}

export const confirmEmail = async (email: string) => {
    try {
        const response = axios.get(REST_API_BASE_URL + `/confirm-email/${email}`)
        return response;
    } catch (error) {
        console.error('Error confirming email:', error);
        throw error;
    }
}

export const resetPassword = async (email: string, password: string) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update-password`, {
            email,
            password,
        });
        return response;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

