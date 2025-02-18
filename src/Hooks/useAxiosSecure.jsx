import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  //baseURL: "https://assignment-12-server-wheat-iota.vercel.app",
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogOut } = useAuth();

  // request interceptor to add authorization header for every secure call to the api
  const addAuthHeader = (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  };

  // interceptors
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      addAuthHeader,
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status; // Optional chaining
        if (status === 401 || status === 403) {
          await userLogOut();
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, userLogOut]);

  return axiosSecure;
};

export default useAxiosSecure;
