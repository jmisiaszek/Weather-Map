import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    popMin: 0,
    popMax: 1000000000
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters(state, action) {
            state.name = action.payload.name;
            state.popMin = action.payload.popMin;
            state.popMax = action.payload.popMax;
        }
    }
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;