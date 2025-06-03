import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import activitiesService from "./activitiesService";

const initialState ={
    activities : [],
    allActivities : []
} 

export const createActivity = createAsyncThunk(
    "activities/createActivity",
    async (formData) => {
      const response = await activitiesService.createActivity(formData);
      return response.activity; // Asumo que el backend devuelve el objeto en response.activity
    }
  );

export const deleteActivity = createAsyncThunk(
    "activities/deleteActivity",
    async (id) => {
        try {
            await activitiesService.deleteActivity(id);
            return id;
        } catch (error) {
            console.error(error);
        }
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllActivities.fulfilled, (state, action) => {
                state.activities = action.payload.activities;
                state.allActivities = action.payload.activities;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.activities.push(action.payload.activity);
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                state.activities = state.activities.filter(activity => activity._id !== idToDelete);
                state.allActivities = state.allActivities.filter(activity => activity._id !== idToDelete);
            });
    }
})

export default activitiesSlice.reducer;