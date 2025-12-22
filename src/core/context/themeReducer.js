export const initialState = {
    notification: "",
    theme: "light",
}


export const themeReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return {...state, notification: action.payload};
        case "TOGGLE_THEME":
            return {...state, theme: state.theme === "light" ? "dark" : "light"};
        default:
            return state;
    }
}