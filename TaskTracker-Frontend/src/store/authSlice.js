import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.200.113:8080/api';

// Async thunks for API calls
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      // Store token and userId in AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data.userId);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const { settings } = getState();
  
  // Keep email if "Remember Me" was enabled
  const savedEmail = await AsyncStorage.getItem('rememberedEmail');
  
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userId');
  // Don't remove rememberedEmail - keep it for next login
  
  return { savedEmail };
});

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const token = await AsyncStorage.getItem('token');
  const userId = await AsyncStorage.getItem('userId');
  
  if (token && userId) {
    return { token, userId };
  }
  throw new Error('No auth data found');
});

// Add these new async thunks
export const saveRememberedEmail = createAsyncThunk(
  'auth/saveRememberedEmail',
  async ({ email, remember }) => {
    if (remember) {
      await AsyncStorage.setItem('rememberedEmail', email);
    } else {
      await AsyncStorage.removeItem('rememberedEmail');
    }
    return { email: remember ? email : null };
  }
);

export const getRememberedEmail = createAsyncThunk(
  'auth/getRememberedEmail',
  async () => {
    const email = await AsyncStorage.getItem('rememberedEmail');
    return { email };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    userId: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    rememberedEmail: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logout.fulfilled, (state, action) => {
        state.token = null;
        state.userId = null;
        state.user = null;
        state.isAuthenticated = false;
        // Keep rememberedEmail if it exists
        state.rememberedEmail = action.payload?.savedEmail || state.rememberedEmail;
      })
      // Check auth status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false;
      })
      // Remember email cases
      .addCase(saveRememberedEmail.fulfilled, (state, action) => {
        state.rememberedEmail = action.payload.email;
      })
      .addCase(getRememberedEmail.fulfilled, (state, action) => {
        state.rememberedEmail = action.payload.email;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;