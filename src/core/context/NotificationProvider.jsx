import {createContext, useContext, useReducer} from "react";
import {notificationReducer, initialState} from "./notificationReducer.js";

export const notificationContext = createContext();
export const useNotifications = () => {
    const context = useContext(notificationContext);
    if (!context) throw new Error("useNotifications must be used within NotificationProvider");
    return context;
}

function NotificationProvider({children}) {
    const [state, dispatch] = useReducer(notificationReducer, initialState);

    const showNotification = (text, type = "success") => {
        dispatch({type: "SET_NOTIFICATION", payload: {text, type}});
        setTimeout(() => {
            dispatch({type: "CLEAR_NOTIFICATION"});
        }, 3000);
    }

    return (
        <notificationContext.Provider value={{...state, dispatch, showNotification}}>
            {children}
        </notificationContext.Provider>
    );
}

export default NotificationProvider;