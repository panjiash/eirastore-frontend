import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverMaster } from "../config/Index";

// Thunk untuk mengambil data user
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverMaster}/me`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
