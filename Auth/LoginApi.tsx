import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = `${process.env.API_BASE_URL}/api/v3/login`;

// Function to call the login endpoint and store JWT token
export const login = async (username: string, password: string) => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post(API_BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const { access_token, token_type } = response.data;
        console.log('Login successful, token:', access_token);
        await AsyncStorage.setItem('jwtToken', access_token);
        return { access_token, token_type };
    } catch (error) {
        console.error('Error logging in:', error);
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 400:
                    console.error('Bad Request');
                    throw new Error('Bad Request');
                case 401:
                    console.error('Incorrect username or password');
                    throw new Error('Incorrect username or password');
                case 403:
                    console.error('Forbidden');
                    throw new Error('Forbidden');
                case 404:
                    console.error('Not Found');
                    throw new Error('Not Found');
                case 500:
                    console.error('Internal Server Error');
                    throw new Error('Internal Server Error');
                default:
                    console.error('Login failed:', error.response?.data?.detail);
                    throw new Error('Login failed! please check your connection');
            }
        } else {
            throw new Error('Login failed');
        }
    }
};

// Function to get the stored JWT token
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw error;
    }
};

// Function to remove the stored JWT token (logout)
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('jwtToken');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};
