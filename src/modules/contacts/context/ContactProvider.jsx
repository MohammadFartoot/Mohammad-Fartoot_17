import {createContext, useContext, useEffect, useReducer, useMemo} from "react";
import {initialState, contactReducer} from "./contactReducer.js";
import {
    getContactsReq,
    addContactReq,
    deleteContactReq,
    updateContactReq,
    deleteSelectedContactsReq
} from "../../../core/services/contactService.js"
import {useNotifications} from "../../../core/context/NotificationProvider.jsx";


export const ContactContext = createContext();
export const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) throw new Error("useContacts must be used within ContactProvider");
    return context;
};

function ContactProvider({children}) {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const {showNotification} = useNotifications();

    const setPage = (pageName) => {
        dispatch({type: "SET_PAGE", payload: pageName});
    }

    const addContact = async (newContact) => {
        try {
            const add = await addContactReq(newContact);
            dispatch({type: "ADD_CONTACT", payload: add})
            showNotification("مخاطب با موفقیت افزوده شد", "success");
            return {success: true, contact: add};
        } catch (error) {
            showNotification("نقص فنی در افزودن مخاطب", "error");
            return {error: error.message}
        }
    }
    const deleteContact = async () => {
        const id = state.selectContactId;
        if (!id) return;
        try {
            await deleteContactReq(id);
            dispatch({
                type: "DELETE_CONTACT",
                payload: {id}
            })
            showNotification("مخاطب با موفقیت حذف شد", "success");
        } catch (error) {
            console.log("Failed to delete contact:", error.message)
            showNotification("نقص فنی در افزودن مخاطب", "error");
            return {error: error.message}
        }
    }
    const openDeleteModal = (id) => {
        dispatch({type: "OPEN_DELETE_MODAL", payload: id})
    }
    const closeDeleteModal = () => {
        dispatch({type: "CLOSE_DELETE_MODAL"})
    }
    const editHandler = async (contact) => {
        dispatch({type: "EDIT_CONTACT", payload: contact});
    }
    const selectContacts = (id) => {
        dispatch({type: "SELECT_CONTACTS", payload: {id}})
    }
    const deleteSelectedContacts = async () => {
        const ids = state.selectedContactIds;
        if (ids.length === 0) return;
        try {
            await deleteSelectedContactsReq(ids);
            dispatch({
                type: "DELETE_SELECTED_CONTACTS",
                payload: {ids}
            })
            showNotification("مخاطبین با موفقیت حذف شدند", "success");
        } catch (error) {
            console.log("Failed to delete contacts:", error.message);
            showNotification("نقص فنی در حذف گروهی", "error");
            return {error: error.message}
        }
    }
    const openBulkDeleteModal = () => {
        dispatch({type: "OPEN_BULK_DELETE_MODAL"});
    }
    const closeBulkDeleteModal = () => {
        dispatch({type: "CLOSE_BULK_DELETE_MODAL"});
    }
    const toggleSelectMode = () => {
        dispatch({type: "TOGGLE_SELECT_MODE"})
    }
    const setSearchContacts = (contact) => {
        dispatch({type: "SET_SEARCH_CONTACTS", payload: contact});
    }
    const updateContact = async (contact) => {
        try {
            const update = await updateContactReq(contact);
            dispatch({type: "UPDATE_CONTACT", payload: update});
            return {success: true, contact: update};
        } catch (error) {
            console.log("Failed to update contact:", error.message);
            showNotification("نقص فنی در ویرایش مخاطب", "error");
            return {error: error.message}
        }
    }
    const closeEditContact = () => {
        dispatch({type: "CLOSE_EDIT_CONTACT"})
    }
    const filteredContacts = useMemo(() => {
        const search = state.searchContacts.toLowerCase();
        if (!search) return state.contacts;
        return state.contacts.filter((contact) => contact.name.toLowerCase().includes(search) ||
            contact.email.toLowerCase().includes(search)
        )
    }, [state.contacts, state.searchContacts]);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const get = await getContactsReq();
                dispatch({type: "SET_CONTACTS", payload: get});
            } catch (error) {
                console.error("Failed to load contacts:", error.message);
                showNotification("نقص فنی در گرفتن مخاطبین", "error");
            }
        }
        loadContacts();
    }, []);

    return (
        <ContactContext.Provider value={{
            ...state,
            dispatch,
            setPage,
            addContact,
            deleteContact,
            openDeleteModal,
            closeDeleteModal,
            editHandler,
            selectContacts,
            deleteSelectedContacts,
            openBulkDeleteModal,
            closeBulkDeleteModal,
            toggleSelectMode,
            setSearchContacts,
            updateContact,
            closeEditContact,
            filteredContacts,
        }}>
            {children}
        </ContactContext.Provider>
    );
}

export default ContactProvider;