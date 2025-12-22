import api from "./config.js";


export const getContactsReq = async () => {
    const response = await api.get("/contacts");
    return response.data;
}

export const addContactReq = async (newContact) => {
    const response = await api.post("/contacts", newContact);
    return response.data;
}

export const deleteContactReq = async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
}

export const updateContactReq = async (contact) => {
    const response = await api.patch(`/contacts/${contact.id}`, contact);
    return response.data;
}

export const deleteSelectedContactsReq = async (ids) => {
    const response = await Promise.all(ids.map((id) => api.delete(`/contacts/${id}`)));
    return response.data;
}