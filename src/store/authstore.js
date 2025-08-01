// src/store/authStore.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const registerUser = async ({ email, password, username }) => {
  try {
    const res = await axios.post('http://localhost:8000/api/auth/register', {
      email,
      password,
      username,
      role: 'user' // Default role for new users
    });

    return toast.success('Registration successful!');   // success response

  } catch (error) {
    console.error('Registration error:', error);
    toast.error(error.response?.data?.message || 'Registration failed'); // error response
    throw error; // rethrow to handle in component
  }
};



export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios.post(
      'http://localhost:8000/api/auth/login',
      { email, password },
      { withCredentials: true } // ✅ sends the cookie
    );

    toast.success('Login successful!');
    return res.data; // optional: could include username from server
  } catch (error) {
    console.error('Login failed:', error);
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

// src/store/authStore.js
export const getCurrentUser = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/auth/me', {
      withCredentials: true
    });

    return res.data; // { id, username, role }
  } catch (error) {
    throw new Error('Not authenticated');
  }
};

export const logoutUser = async () => {
  await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
};
