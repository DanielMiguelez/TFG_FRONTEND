import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import activitiesService from "./activitiesService";

const initialState ={
    activities : []
} 

export const createActivity = createAsyncThunk(
    "activities/createActivity",
    async (formData) => {
      const response = await activitiesService.createActivity(formData);
      return response.activity; // Asumo que el backend devuelve el objeto en response.activity
    }
  );

export const getAllActivities = createAsyncThunk(
    "/activities/getAllActivities",
    async() =>{
        try {
            return await activitiesService.getAllActivities()
        } catch (error) {
            console.error(error)
        }
    }
);

export const joinActicity = createAsyncThunk(
    "activities/joinActivity",
    async (_id) => {
      return await activitiesService.joinActicity(_id);
    }
  );
  


export const leaveActivity = createAsyncThunk(
    'activities/leaveActivity',
    async (_id) => {
      return await activitiesService.leaveActivity(_id);
    }
  );
  
export const activitiesSlice = createSlice({
    name: "activities",
    initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder 
            .addCase(getAllActivities.fulfilled, (state, action) =>{
                state.activities = action.payload.activities
            })
            .addCase(createActivity.fulfilled, (state, action) => {
              state.activities.push(action.payload.activity);             
             });
    }
})

export default activitiesSlice.reducer;