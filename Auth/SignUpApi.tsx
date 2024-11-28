import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;

//process.env.API_BASE_URL

export const signUp = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v3/signup`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 400:
                    if (error.response?.data?.detail === 'Username already exists') {
                        console.error('Username already exists');
                        throw new Error('Username already exists');
                    }
                    console.error('Bad Request');
                    throw new Error('Bad Request');
                case 401:
                    console.error('Unauthorized');
                    throw new Error('Unauthorized');
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
                    console.error('Sign up failed:', error.response?.data?.detail);
                    throw new Error('Sign up failed');
            }
        } else {
            throw new Error('An error occurred during sign up');
        }
    }
};