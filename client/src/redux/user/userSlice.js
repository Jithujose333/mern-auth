// import {createSlice} from  '@reduxjs/toolkit'


// const initialState = {

// currentUser : null,
// loading:false,
// error: false,

// }


// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//       loginStart : (state)=>{
//         state.loading = true
//       },
//       loginSuccess: (state ,action) =>{
//           state.currentUser = action.payload;
//           state.loading = false;
//           state.error = false;
//       },
//       loginFailure: (state ,action) => {
//         state.loading = false;
//         state.error = action.payload;
//       }
//     }
// })


// export const {loginStart , loginSuccess , loginFailure} = userSlice.actions

// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfilePicture: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profilePicture = action.payload;
      }
    },
    updateUserDetails: (state, action) => {
      if (state.currentUser) {
        state.currentUser.username = action.payload.username;
        state.currentUser.email = action.payload.email;
      }
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null
      state.loading = false;
      state.error = false;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess,
   loginFailure, 
   updateProfilePicture, 
   updateUserDetails,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   signOut 
  } = userSlice.actions;

export default userSlice.reducer;
