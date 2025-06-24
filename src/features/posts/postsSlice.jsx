import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import postsService from "./postsService"
import { toast } from 'react-toastify';
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';


const initialState = {
    posts: [],
    isLoading: false,
    post: {},
    error: null,
}

export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({ formData, token }, thunkAPI) => {
        try {
            return await postsService.createPost(formData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAllPosts = createAsyncThunk(
    "/posts/getAllPosts",
    async () => {
        try {
            return await postsService.getAllPosts()
        } catch (error) {
            console.error(error)
        }
    }
);

export const like = createAsyncThunk(
    "/posts/like",
    async (_id) => {
        try {
            return await postsService.like(_id)
        } catch (error) {
            console.error(error)
        }
    }
);

export const unlike = createAsyncThunk(
    "/posts/unlike",
    async (_id) => {
        try {
            return await postsService.unlike(_id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const getById = createAsyncThunk("posts/getById/", async (id) => {
    try {
        return await postsService.getById(id);
    } catch (error) {
        console.error(error);
    }
});

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id) => {
        try {
            const response = await postsService.deletePost(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const insertComment = createAsyncThunk(
    "posts/insertComment",
    async ({ postId, comment }, thunkAPI) => {
        try {
            const response = await postsService.insertComment(postId, comment);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Error al añadir el comentario";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload.post);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg || 'Error creating post';
            })

            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts
            })
            .addCase(like.fulfilled, (state, action) => {
                const updatedPost = action.payload?.post;

                if (!updatedPost || !updatedPost._id) {
                    console.warn("Like fallido o sin post válido:", action.payload);
                    return;
                }

                state.posts = state.posts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post
                );
                
                notification.success({
                    message: 'Éxito',
                    description: 'Has dado like al post correctamente',
                    icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
                    placement: 'topRight',
                    duration: 3,
                });
            })

            .addCase(unlike.fulfilled, (state, action) => {
                const updatedPost = action.payload.post;
                if (!updatedPost || !updatedPost._id) {
                    console.warn("Unlike fallido o sin post válido:", action.payload);
                    return;
                }
                state.posts = state.posts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post
                );
            })
            .addCase(unlike.rejected, (state, action) => {
                state.error = "No se pudo quitar el like";
            })

            .addCase(like.rejected, (state, action) => {
                notification.error({
                    message: 'Error',
                    description: 'Ya diste like a este post',
                    icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />,
                    placement: 'topRight',
                    duration: 3,
                });
            })

            .addCase(getById.fulfilled, (state, action) => {
                state.post = action.payload.post;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload._id);
            })
            .addCase(insertComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(insertComment.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedPost = action.payload.post;
                state.posts = state.posts.map(post =>
                    post._id === updatedPost._id ? updatedPost : post
                );
                if (state.post._id === updatedPost._id) {
                    state.post = updatedPost;
                }
            })
            .addCase(insertComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload || "Error al añadir el comentario");
            })
    }
})

export default postsSlice.reducer;