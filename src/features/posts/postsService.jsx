import axios from "axios"

const API_URL = "http://localhost:8000";

const getAllPosts = async() =>{
    const response = await axios.get(API_URL + "/posts/getAllPosts")
    return response.data;
}

const like = async(_id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = await axios.put(API_URL + "/posts/like/" +_id, {}, {
        headers:{
            authorization: user?.token,
        }
    })
    return response.data;
}

const unlike = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(API_URL + "/posts/unlike/" + _id, {}, {
      headers: {
        authorization: user?.token,
      },
    });
    return response.data;
  };

const getById = async (id) => {
    const res = await axios.get(API_URL + "/posts/getPostById/" + id);
    return res.data;
};


const getPostByName = async (title) => {
    const response = await axios.get(API_URL + "/posts/getPostByTitle/" + title);
    return response.data; 
};

const deletePost = async (id) =>{
    const user = JSON.parse(localStorage.getItem("user"))

    const response = await axios.delete(API_URL + "/posts/deletePostById/" +id, {
        headers: {
            authorization:user?.token
        }
    })
    return response.data
}

const postsService = {
    getAllPosts,
    like,
    unlike,
    getById,
    getPostByName, 
    deletePost
}

export default postsService ;