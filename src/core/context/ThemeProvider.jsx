import {createContext, useContext, useEffect, useReducer} from "react";
import {initialState, themeReducer} from "./themeReducer.js";
import {useNotifications} from "./NotificationProvider.jsx";

export const ThemeContext = createContext();
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}


function ThemeProvider({children}) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    const {showNotification} = useNotifications();

    const themeHandler = () => {
        const changeTheme = state.theme;
        dispatch({type: "TOGGLE_THEME"});
        showNotification(
            changeTheme === "dark" ? "☀️ Light mode on" : "🌙 Dark mode on", "error"
        )
    }

    useEffect(() => {
        document.body.className = state.theme === "dark" ? "darkMode" : "";
    }, [state.theme]);

    return (
        <ThemeContext.Provider value={{...state, dispatch, themeHandler, showNotification}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;