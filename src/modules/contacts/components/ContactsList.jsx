import styles from './ContactsList.module.css';
import more from '../images/more.png';
import {useState} from "react";
import {useContacts} from "../context/ContactProvider.jsx";


function ContactsList() {

    const {
        filteredContacts,
        editHandler,
        selectedContactIds,
        selectContacts,
        selectMode,
        openDeleteModal,
    } = useContacts();

    const [activeActionId, setActiveActionId] = useState(null);

    const contacts = filteredContacts ?? [];

    if (!contacts || contacts.length === 0) {
        return (
            <div className={styles.noContacts}><p>هیچ مخاطبی وجود ندارد</p></div>
        );
    }

    return (
        <div className={styles.contactsList}>
            {contacts.map((contact) => {
                return (
                    <div className={styles.contactCard} key={contact.id}>
                        {selectMode && (
                            <input
                                type="checkbox"
                                checked={selectedContactIds.includes(contact.id)}
                                onChange={() => selectContacts(contact.id)}
                            />
                        )}
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>

                        {activeActionId === contact.id ? (
                            <div className={styles.actionButton}>
                                <button onClick={() => editHandler(contact)}>ویرایش</button>
                                <button onClick={() => openDeleteModal(contact.id)}>حذف</button>
                            </div>
                        ) : (
                            <img
                                onClick={() => setActiveActionId(contact.id)}
                                src={more}
                                alt="more"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ContactsList;