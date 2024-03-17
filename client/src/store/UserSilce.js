import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  _id: '',
  name: '',
  role: '',
  email: '',
  verified:false,
  profileImage:'',
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
      _id: decodedToken._id,
      role: decodedToken.role,
      email: decodedToken.email,
      verified: decodedToken.verified,
      profileImage:decodedToken.profileImage
    };
  } catch (error) {
    return {
      id:'',
      name: '',
      role: '',
      email: '',
      verified:false,
      profileImage:''
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
    updateprofileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      const { _id, name, role, email, verified, profileImage } = extractUserInfoFromToken(action.payload);
      state._id = _id;
      state.name = name;
      state.role = role;
      state.email = email;
      state.isLogin = true;
      state.verified = verified;
      state.profileImage = profileImage;
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
  updateprofileImage,
  updateverified,
  removeDetail,
  setIsLogin,
  resetState,
} = userSlice.actions;

export const selectLoading = (state) => state.userData.loading;
export const selectIsLogin = (state) => state.userData.isLogin;

export default userSlice.reducer;
