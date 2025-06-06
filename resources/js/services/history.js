import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default {
    async getTop() {
        const response = await api.get("/search-history/top");
        return response.data;
    },
};
