// src/redux/slices/blogsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = `${import.meta.env.VITE_BACKEND_URL}/api/blogs`;

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchPublishedBlogs = createAsyncThunk(
  "blogs/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE}/published`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE}/slug/${slug}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE, blogData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE}/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const toggleBlogStatus = createAsyncThunk(
  "blogs/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE}/${id}/toggle-status`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Toggle failed");
    }
  }
);

export const toggleBlogFeatured = createAsyncThunk(
  "blogs/toggleFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE}/${id}/toggle-featured`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Toggle failed");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],           // all blogs (admin)
    published: [],       // published only (journal page)
    currentBlog: null,   // single blog (post detail page)
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
    const updateOne = (state, action) => {
      state.loading = false;
      const idx = state.blogs.findIndex((b) => b._id === action.payload._id);
      if (idx !== -1) state.blogs[idx] = action.payload;
      const pidx = state.published.findIndex((b) => b._id === action.payload._id);
      if (pidx !== -1) state.published[pidx] = action.payload;
    };

    builder
      .addCase(fetchAllBlogs.pending, pending)
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, rejected)

      .addCase(fetchPublishedBlogs.pending, pending)
      .addCase(fetchPublishedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.published = action.payload;
      })
      .addCase(fetchPublishedBlogs.rejected, rejected)

      .addCase(fetchBlogBySlug.pending, pending)
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, rejected)

      .addCase(createBlog.pending, pending)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        if (action.payload.status === "Published") {
          state.published.unshift(action.payload);
        }
      })
      .addCase(createBlog.rejected, rejected)

      .addCase(updateBlog.pending, pending)
      .addCase(updateBlog.fulfilled, updateOne)
      .addCase(updateBlog.rejected, rejected)

      .addCase(toggleBlogStatus.fulfilled, updateOne)
      .addCase(toggleBlogStatus.rejected, rejected)

      .addCase(toggleBlogFeatured.fulfilled, updateOne)
      .addCase(toggleBlogFeatured.rejected, rejected)

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        state.published = state.published.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, rejected);
  },
});

export default blogsSlice.reducer;