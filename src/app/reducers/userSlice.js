import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crendentials: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log('userSlice login', action.payload)
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        crendentials: action.payload
      }
    },
    update(state, action) {
      return {
        ...state,
      }
    },
    logout(state, action) {
      console.log('userSlice logout', action.payload)
      localStorage.removeItem('token')
      return {
        ...state,
        crendentials: null
      }
    },
  },
})

export const { login,  } = userSlice.actions;

export default userSlice.reducer;