import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";  // import your feed slice

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,   // ✅ key must match useSelector in Feed.jsx
    }
});

export default appStore;
