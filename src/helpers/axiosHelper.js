import axios from "axios";

const BACKEND = axios.create({
    baseURL: import.meta.env.VITE_BACKEND
});

export default BACKEND;