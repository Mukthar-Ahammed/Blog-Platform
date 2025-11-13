import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, checkAuth } from "../api/userApi";

// ✅ Signup
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data; // backend returns the user object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// ✅ Login
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Check Auth
export const checkUserAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkAuth();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // ✅ direct assignment
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // ✅ direct assignment
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ direct assignment
        state.isAuthenticated = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
