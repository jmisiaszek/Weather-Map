import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: null,
    loading: false,
    error: null,
    bbox: null
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        getUserLocation(state) {
            state.loading = true;
            state.error = null;
        },
        getUserLocationSuccess(state, action) {
            state.loading = false;
            // if (!state.location) {
            //     state.location = action.payload;
            // }
            state.location = action.payload;
        },
        getUserLocationError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setBbox(state, action) {
            state.bbox = action.payload;
        }
    }
});

export const { getUserLocation, getUserLocationSuccess, getUserLocationError, setBbox } = mapSlice.actions;
export default mapSlice.reducer;