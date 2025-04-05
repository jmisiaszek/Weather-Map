import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {},
    loading: false,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeather(state, action) {
            state.loading = true;
            state.error = null;
        },
        getWeatherSuccess(state, action) {
            const { city, data } = action.payload;
            state.data[city] = data;
            state.loading = false;
        },
        getWeatherError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getWeatherExists(state, action) {
            // Weather data for the city is already in the store.
            state.loading = false;
        },
        clearWeather(state) {
            state.data = {};
            state.loading = false;
            state.error = null;
        }
    }
});

export const { getWeather, getWeatherSuccess, getWeatherError, getWeatherExists, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;