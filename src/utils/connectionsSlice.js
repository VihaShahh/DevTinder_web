import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        setConnections: (state, action) => {
            return action.payload || [];
        },
        clearConnections: () => {
            return [];
        }
    }
});

export const { setConnections, clearConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
