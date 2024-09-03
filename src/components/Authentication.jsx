import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router';
import ERRORS from '@constants/validation-errors.js';

const AuthContext = createContext();

const LOCAL_OR_REMOTE = import.meta.env.VITE_REMOTE_LOCAL;
const LOCAL_URL = import.meta.env.VITE_LOCAL_API_URL;
const REMOTE_URL = import.meta.env.VITE_REMOTE_API_URL;

// apis
const SEND_OTP = import.meta.env.VITE_SEND_OTP;
const SUBMIT_OTP = import.meta.env.VITE_SUBMIT_OTP;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [host, setHost] = useState(
    LOCAL_OR_REMOTE == 'false' ? LOCAL_URL : REMOTE_URL,
  );

  const navigate = useNavigate();

  const sendOtp = async (mobile) => {
    try {
      const res = await axios.post(`${host}/${SEND_OTP}`, {
        mobile: mobile,
      });
      const { code } = res.data.data;
      return code;
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOtp = async (code, mobile) => {
    console.log(code, mobile);
    try {
      const res = await axios.post(`${host}/${SUBMIT_OTP}`, {
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
        host,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
