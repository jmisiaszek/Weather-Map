import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './themeSlice';

const ThemeSwitch = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.theme);

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            {mode === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
    )
}

export default ThemeSwitch;