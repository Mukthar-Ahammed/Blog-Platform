import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducer, 
    user: userReducer,  
  },
});

export default store;
