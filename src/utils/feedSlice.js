import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            const newUsers = action.payload.filter(
                (u) => !state.some((existing) => String(existing._id) === String(u._id))
            );
            return [...state, ...newUsers];
        },
        removeFeed: (state, action) => {

            const userId = String(action.payload);
            return state.filter((user) => String(user._id) !== userId);
        },
    },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
