import axios from 'axios'

const API_URL = 'http://localhost:8000'

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || '';
  };
  
const getAllActivities = async()=>{
    const response = await axios.get(API_URL + "/activities/getAllActivities")
    return response.data
}

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
  

const leaveActivity = async(_id) =>{
    const response = await axios.put(API_URL + "/activities/leaveActivity/" + _id);
    return response.data;
}

const activitiesService = {
    getAllActivities,
    joinActicity,
    leaveActivity
}

export default activitiesService;