import axios from "axios";

const API_URL = "http://localhost:8000";

const register = async (userData) => {
    const response = await axios.post(API_URL + "/users/createUser", userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "/users/login", userData);
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data;
};

const logout = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = await axios.delete(API_URL + "/users/logout", {
        headers: {
            authorization: user.token
        }
    });
    if(response.data){
        localStorage.removeItem("user")
    }
    return response.data;
};

const authService = {
    register,
    login,
    logout
};

export default authService;