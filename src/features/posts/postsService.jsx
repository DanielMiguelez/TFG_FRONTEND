import axios from "axios"

const API_URL = "http://localhost:8000";

const getAllPosts = async() =>{
    const response = await axios.get(API_URL + "/posts/getAllPosts")
    return response.data;
}

const postsService = {
    getAllPosts
}

export default postsService ;