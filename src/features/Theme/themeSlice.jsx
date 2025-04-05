import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'dark',
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            state.url = state.theme === 'dark' ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;