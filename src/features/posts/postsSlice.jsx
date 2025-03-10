import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import postsService from "./postsService"

const initialState = {
    posts:[]
}

export const getAllPosts = createAsyncThunk (
    "/posts/getAllPosts",
    async() =>{
        try {
            return postsService.getAllPosts()
        } catch (error) {
            console.error(error)
        }
    }
);


export const postsSlice = createSlice({
    name: "products",
    initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder 
            .addCase(getAllPosts.fulfilled, (state, action) =>{
                state.posts = action.payload.posts
            })
    }
})

export default postsSlice.reducer;