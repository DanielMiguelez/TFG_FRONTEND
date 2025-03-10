import axios from "axios";

const API_URL = "http://localhost:8000";

const register = async (userData) => {
    const response = await axios.post(API_URL + "/users/createUser", userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "/users/login", userData);
    if(response.data){
        localStorage.setItem(JSON.stringify(response.data))
    }
    return response.data;
};


const authService = {
    register,
    login
};

export default authService;