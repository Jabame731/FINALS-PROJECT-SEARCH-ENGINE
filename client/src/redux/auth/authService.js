import axios from 'axios';

const API_URL_REGISTER = '/api/auth/register';
const API_URL_LOGIN = '/api/auth/login';

const registerUser = async (userData) => {
  const response = await axios.post(API_URL_REGISTER, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
