import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((req) => {
        req.headers.Authorization = "token";
        return req;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
);

api.interceptors.response.use((res) => {
        return res;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
);

export default api;