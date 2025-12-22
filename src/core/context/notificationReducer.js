export const initialState = {
    notification: {text: "", type: ""}
}

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return {...state, notification: action.payload};
        case "CLEAR_NOTIFICATION":
            return {...state, notification: {text: "", type: ""}};
        default:
            return state;
    }
}