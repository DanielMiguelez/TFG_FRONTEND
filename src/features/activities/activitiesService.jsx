import axios from 'axios'

const API_URL = 'https://tfg-backend-xgxu.vercel.app'

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

const createActivity = async (formData) => {
  const token = getToken();

  const res = await axios.post(`${API_URL}/activities/createActivity`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getAllActivities = async () => {
  const response = await axios.get(API_URL + "/activities/getAllActivities")
  return response.data
}

const deleteActivity = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/activities/deleteActivity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const joinActicity = async (_id) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/users/joinActivity/${_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


const leaveActivity = async (_id) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/users/leaveActivity/${_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const activitiesService = {
  createActivity,
  getAllActivities,
  joinActicity,
  leaveActivity,
  deleteActivity
}

export default activitiesService;