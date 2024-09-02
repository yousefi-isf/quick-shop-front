import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router';
import ERRORS from '@constants/validation-errors.js';

const AuthContext = createContext();

const API_SEND_OTP = import.meta.env.VITE_SEND_OTP;
const API_SUBMIT_OTP = import.meta.env.VITE_SUBMIT_OTP;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  const navigate = useNavigate();

  const sendOtp = async (mobile) => {
    try {
      const res = await axios.post(API_SEND_OTP, {
        mobile: mobile,
      });
      const { code } = res.data.data;
      return code;
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOtp = async (code, mobile) => {
    console.log(code, mobile, API_SUBMIT_OTP);
    try {
      const res = await axios.post(API_SUBMIT_OTP, {
        mobile: mobile,
        code: code,
      });
      const data = res.data;
      return data;
    } catch (error) {
      // console.error(error);
      if (error.response.status == 400) {
        // throw new Error(ERRORS.invalid_code);
        return ERRORS.invalid_code;
      }
    }
  };
  const login = (token) => {
    setToken(token);
    localStorage.setItem('userToken', token);
    navigate('/');
  };
  const logout = () => {
    setToken('');
    localStorage.setItem('userToken', '');
    // navigate(0);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        sendOtp,
        submitOtp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
