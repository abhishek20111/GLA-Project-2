import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  name: '',
  role: '',
  email: '',
  verified:false,
  token: localStorage.getItem('token') || '',
  details: [],
  loading: false,
  isLogin: false,
};

const extractUserInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return {
      name: decodedToken.name,
      role: decodedToken.role,
      email: decodedToken.email,
      verified: decodedToken.verified
    };
  } catch (error) {
    return {
      name: '',
      role: '',
      email: '',
      verified:false
    };
  }
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateRole: (state, action) => {
      state.role = action.payload;
    },
    updateverified: (state, action) => {
      state.verified = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      const { name, role, email, verified } = extractUserInfoFromToken(action.payload);
      state.name = name;
      state.role = role;
      state.email = email;
      state.isLogin = true;
      state.verified = verified;
    },
    addDetail: (state, action) => {
      state.details.push(action.payload);
    },
    removeDetail: (state, action) => {
      const index = state.details.findIndex(
        (detail) => detail.id === action.payload
      );
      if (index !== -1) {
        state.details.splice(index, 1);
      }
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  addName,
  setLoading,
  updateRole,
  updateToken,
  addDetail,
  updateverified,
  removeDetail,
  setIsLogin,
  resetState,
} = userSlice.actions;

export const selectLoading = (state) => state.userData.loading;
export const selectIsLogin = (state) => state.userData.isLogin;

export default userSlice.reducer;
