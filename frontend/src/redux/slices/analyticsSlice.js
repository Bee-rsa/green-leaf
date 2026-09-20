import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

/*
|--------------------------------------------------------------------------
| Fetch Admin Analytics
|--------------------------------------------------------------------------
*/

export const fetchAdminAnalytics =
  createAsyncThunk(
    "analytics/fetchAdminAnalytics",
    async (_, { rejectWithValue }) => {
      try {
        const token =
          localStorage.getItem("userToken");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/analytics/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to load analytics"
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  analytics: null,
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const analyticsSlice = createSlice({
  name: "analytics",

  initialState,

  reducers: {
    clearAnalytics: (state) => {
      state.analytics = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchAdminAnalytics.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminAnalytics.fulfilled,
        (state, action) => {
          state.loading = false;
          state.analytics = action.payload;
        }
      )

      .addCase(
        fetchAdminAnalytics.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;