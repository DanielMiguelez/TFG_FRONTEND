import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    allUsers: [],
    isLoading: false,
    error: null
};

export const register = createAsyncThunk(
    "auth/register",
    async (user) => {
        try {
            return await authService.register(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Error al iniciar sesión";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            return await authService.logout();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await authService.getAllUsers(token);
            return response.users || [];
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.allUsers = [];
                state.error = null;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.allUsers = [];
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.allUsers = [];
            });
    }
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;