import axios from 'axios';

const REST_API_BASE_URL = 'https://proactive-elegance-production.up.railway.app/api/readersinfo';

export const authenticate = async (email: string, password:string) => {
    try {
        const response = await axios.post(REST_API_BASE_URL+"/authenticate", {
          email,
          password,
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateReader = async (readerid: number, readersinfo: any) => {
    try {
        const response = await axios.put(REST_API_BASE_URL + `/${readerid}`,readersinfo, {
            headers: {
              'Content-Type': 'applicati   on/json',
            },
          });

        console.log('reader updated successfully:', response.data);
         return response.data;
    } catch (error: any) {
      console.error('Error updating reader:', error.response ? error.response.data : error);
      throw error;
    }
};

export const createReader = async (readersinfo: any) => { // Mark the function as async
  try {
      const response = await axios.post(REST_API_BASE_URL, readersinfo, {
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


