import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllPosts();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUsers = createAsyncThunk(
  "posts/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUsers();
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPostsBySearch = createAsyncThunk(
  "posts/getPostsBySearch",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPostsBySearch(searchQuery);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await api.getUserPosts(userID);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.createPost(formData);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postID, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(postID);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postID, { rejectWithValue }) => {
    try {
      const response = await api.likePost(postID);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    users: [],
    userPosts: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPosts = action.payload;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPosts = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPostsBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostsBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPostsBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default postsSlice.reducer;
