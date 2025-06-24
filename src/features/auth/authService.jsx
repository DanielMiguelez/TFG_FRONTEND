import axios from "axios";

const API_URL = "https://tfg-backend-xgxu.vercel.app";

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
            authorization: `Bearer ${user.token}`
        }
    });
    if(response.data){
        localStorage.removeItem("user")
    }
    return response.data;
};

const getAllUsers = async (token) => {
    const response = await axios.get(API_URL + "/users/getAllUsers", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const deleteUser = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(`${API_URL}/users/deleteUser/${_id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getAllUsers,
    deleteUser
};

export default authService;