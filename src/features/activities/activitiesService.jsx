import axios from 'axios'

const API_URL = 'http://localhost:8000'

const getAllActivities = async()=>{
    const response = await axios.get(API_URL + "/activities/getAllActivities")
    return response.data
}

const activitiesService = {
    getAllActivities
}

export default activitiesService;