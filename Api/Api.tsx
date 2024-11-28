import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Function to call the root endpoint
export const getRoot = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching root endpoint:', error);
        throw error;
    }
};

// Function to call the status endpoint
export const getStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching status endpoint:', error);
        throw error;
    }
};

// Function to call any endpoint with a given path
export const callApi = async (path: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${path}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${path} endpoint:`, error);
        throw error;
    }
};
// Function to call any endpoint with a given path and JWT token for authentication
export const callApiWithAuth = async (path: string, token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${path} endpoint with auth:`, error);
        throw error;
    }
};
