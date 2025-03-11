import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import activitiesService from "./activitiesService";

const initialState ={
    activities : []
} 

export const getAllActivities = createAsyncThunk(
    "/activities/getAllActivities",
    async() =>{
        try {
            return activitiesService.getAllActivities()
        } catch (error) {
            console.error(error)
        }
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
    }
})

export default activitiesSlice.reducer;