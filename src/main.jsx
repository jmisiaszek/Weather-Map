import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './features/Theme/themes'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Root = () => {
    const mode = useSelector((state) => state.theme.theme);
    const theme = mode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.color;
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    )
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Root />
        </Provider>
    </StrictMode>,
)
