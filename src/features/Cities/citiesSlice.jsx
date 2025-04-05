import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cities: [],
    loading: false,
    error: null
};

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        getCities(state, action) {
            state.loading = true;
            state.error = null;
        },
        getCitiesSuccess(state, action) {
            state.loading = false;
            state.cities = action.payload;
        },
        getCitiesError(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getCities, getCitiesSuccess, getCitiesError } = citiesSlice.actions;
export default citiesSlice.reducer;