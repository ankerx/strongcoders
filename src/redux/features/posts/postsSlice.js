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
      console.log(response);
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
    post: {},
    posts: [],
    users: [],
    userPosts: [],
    error: "",
    loading: false,
  },
  reducers: {
    stepOne: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUserPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getPostsBySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload
        );
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { stepOne } = postsSlice.actions;
export default postsSlice.reducer;
