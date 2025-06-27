import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 2000,
});

export default axiosInstance