export const initialState = {
    page: "homePage",
    contacts: [],
    deleteModal: false,
    selectContactId: null,
    editContact: null,
    selectMode: false,
    selectedContactIds: [],
    bulkDeleteModal: false,
    searchContacts: "",
}

export const contactReducer = (state, action) => {
    const id = action.payload?.id;
    const ids = action.payload?.ids;

    switch (action.type) {
        case "SET_PAGE":
            return {...state, page: action.payload};
        case "ADD_CONTACT":
            return {...state, contacts: [...state.contacts, action.payload]};
        case "DELETE_CONTACT": {
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== id),
                selectContactId: state.selectContactId === id ? null : state.selectContactId,
                deleteModal: false,
            }
        }
        case "SELECT_CONTACTS": {
            const selectedContacts = state.selectedContactIds.includes(id);
            return {
                ...state,
                selectedContactIds: selectedContacts ? state.selectedContactIds.filter(
                    (contact) => contact !== id) : [...state.selectedContactIds, id],
            }
        }
        case "DELETE_SELECTED_CONTACTS": {
            return {
                ...state,
                contacts: state.contacts.filter((contact) => !ids.includes(contact.id)),
                selectedContactIds: [],
                selectMode: false,
                bulkDeleteModal: false,
            }
        }
        case "EDIT_CONTACT":
            return {...state, editContact: action.payload, page: "addPage"};
        case "SET_SEARCH_CONTACTS":
            return {...state, searchContacts: action.payload};
        case "CLEAR_SELECTION":
            return {...state, selectContactId: null};
        case "UPDATE_CONTACT": {
            const updated = state.contacts.map((contact) =>
                contact.id === action.payload.id ? action.payload : contact
            );
            return {...state, contacts: updated, editContact: null};
        }
        case "SET_CONTACTS":
            return {...state, contacts: action.payload};
        case "CLOSE_EDIT_CONTACT":
            return {...state, editContact: null};
        case "OPEN_DELETE_MODAL":
            return {...state, deleteModal: true, selectContactId: action.payload};
        case "CLOSE_DELETE_MODAL":
            return {...state, deleteModal: false};
        case "OPEN_BULK_DELETE_MODAL":
            return {...state, bulkDeleteModal: true};
        case "CLOSE_BULK_DELETE_MODAL":
            return {...state, bulkDeleteModal: false};
        case "TOGGLE_SELECT_MODE":
            return state.selectMode
                ? {...state, selectMode: false, selectedContactIds: []}
                : {...state, selectMode: true};
        default:
            return state;
    }
}