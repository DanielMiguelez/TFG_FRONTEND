import axios from "axios"

const API_URL = "https://tfg-backend-xgxu.vercel.app";


const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

const createPost = async (postData) => {
  const token = getToken();

  const response = await axios.post(
    `${API_URL}/posts/createPost`,
    postData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
}

const insertComment = async (postId, comment) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/posts/insertComment/${postId}`,
    { comment },
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  return response.data;
}

const getAllPosts = async () => {
  const response = await axios.get(API_URL + "/posts/getAllPosts")
  return response.data;
}

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.put(
    API_URL + "/posts/like/" + _id,
    {},
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  return response.data;
};

const unlike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.put(
    API_URL + "/posts/unlike/" + _id,
    {},
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  return response.data;
};

const getById = async (id) => {
  const res = await axios.get(API_URL + "/posts/getPostById/" + id);
  return res.data;
};

const deletePost = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.delete(API_URL + "/posts/deletePostById/" + id, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  return response.data;
};

const postsService = {
  createPost,
  getAllPosts,
  like,
  unlike,
  getById,
  deletePost,
  insertComment
}

export default postsService;