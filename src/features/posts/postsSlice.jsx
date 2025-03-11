import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import postsService from "./postsService"

const initialState = {
    posts: [],
    isLoading: false,
    post:{}
}

export const getAllPosts = createAsyncThunk(
    "/posts/getAllPosts",
    async () => {
        try {
            return postsService.getAllPosts()
        } catch (error) {
            console.error(error)
        }
    }
);

export const like = createAsyncThunk(
    "/posts/like",
    async (_id) => {
        try {
            return postsService.like(_id)
        } catch (error) {
            console.error(error)
        }
    }
);

export const getById = createAsyncThunk("posts/getById", async (id) => {
    try {
        return await postsService.getById(id);
    } catch (error) {
        console.error(error);
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts
            })
            .addCase(like.fulfilled, (state, action) => {
                const posts = state.posts.map(post => {
                    if (post._id == action.payload._id) {
                        post = action.payload
                    }
                    return post
                })
                state.posts = posts;
            })
            builder.addCase(getById.fulfilled, (state, action) => {
                state.post = action.payload.post; 
            });
    }
})

export default postsSlice.reducer;