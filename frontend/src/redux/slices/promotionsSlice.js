// src/redux/slices/promotionsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = `${import.meta.env.VITE_BACKEND_URL}/api/promotions`;

// ── Thunks ──────────────────────────────────────────────────────────────────

export const fetchAllPromotions = createAsyncThunk(
  "promotions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchPromotionsByPage = createAsyncThunk(
  "promotions/fetchByPage",
  async (page, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE}/page/${page}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const createPromotion = createAsyncThunk(
  "promotions/create",
  async ({ imageUrl, page, featured }, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE, { imageUrl, page, featured });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const togglePromotionActive = createAsyncThunk(
  "promotions/toggleActive",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE}/${id}/toggle-active`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const togglePromotionFeatured = createAsyncThunk(
  "promotions/toggleFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE}/${id}/toggle-featured`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const deletePromotion = createAsyncThunk(
  "promotions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ── Slice ────────────────────────────────────────────────────────────────────

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    promotions: [],     // all promotions (admin view)
    pagePromos: [],     // active promos for a specific page (frontend use)
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // fetchAll
      .addCase(fetchAllPromotions.pending, pending)
      .addCase(fetchAllPromotions.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = action.payload;
      })
      .addCase(fetchAllPromotions.rejected, rejected)

      // fetchByPage
      .addCase(fetchPromotionsByPage.pending, pending)
      .addCase(fetchPromotionsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pagePromos = action.payload;
      })
      .addCase(fetchPromotionsByPage.rejected, rejected)

      // create
      .addCase(createPromotion.pending, pending)
      .addCase(createPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions.unshift(action.payload);
      })
      .addCase(createPromotion.rejected, rejected)

      // toggleActive
      .addCase(togglePromotionActive.fulfilled, (state, action) => {
        const idx = state.promotions.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.promotions[idx] = action.payload;
      })
      .addCase(togglePromotionActive.rejected, rejected)

      // toggleFeatured
      .addCase(togglePromotionFeatured.fulfilled, (state, action) => {
        const idx = state.promotions.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.promotions[idx] = action.payload;
      })
      .addCase(togglePromotionFeatured.rejected, rejected)

      // delete
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.promotions = state.promotions.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePromotion.rejected, rejected);
  },
});

export default promotionsSlice.reducer;