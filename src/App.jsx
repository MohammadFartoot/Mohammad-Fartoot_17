import {
    Header,
    Contacts,
    ContactsList,
    Notification,
    Modal,
    ContactProvider,
    useContacts
} from "./modules/contacts/index.js";

import {
    ThemeProvider,
    useTheme,
    NotificationProvider
} from "./core/index.js"

import styles1 from "./modules/contacts/components/Modal.module.css"



function App() {

    const {
        page,
        deleteContact,
        deleteSelectedContacts,
        deleteModal,
        bulkDeleteModal,
        closeDeleteModal,
        closeBulkDeleteModal,
        filteredContacts,
    } = useContacts();

    const {
        theme,
    } = useTheme();

    return (
        <div className={theme === "light" ? "lightMode" : "darkMode"}>
            {page === "homePage" && (
                <>
                    < Header/>
                    < ContactsList contacts={filteredContacts}/>
                </>
            )}

            {page === "addPage" && (
                < Contacts/>
            )}
            < Notification/>

            {deleteModal && (
                <Modal onClose={() => closeDeleteModal()}>
                    <h3 className={styles1.text}>آیا مطمئن هستید که این مخاطب حذف شود؟</h3>
                    <button className={styles1.confirmButton} onClick={() => deleteContact()}>حذف</button>
                    <button className={styles1.cancelButton} onClick={() => closeDeleteModal()}>انصراف</button>
                </Modal>
            )}
            {bulkDeleteModal && (
                <Modal onClose={() => closeBulkDeleteModal()}>
                    <h3 className={styles1.text}>شما در حال حذف گروهی مخاطبین هستید</h3>
                    <h4 className={styles1.text}>آیا مطمئن هستید؟</h4>
                    <button className={styles1.confirmButton} onClick={() => deleteSelectedContacts()}>بله</button>
                    <button className={styles1.cancelButton} onClick={() => closeBulkDeleteModal()}>انصراف</button>
                </Modal>
            )}
        </div>
    )
}

export default function InnerApp() {
    return (
        <NotificationProvider>
            <ThemeProvider>
                <ContactProvider>
                    <App/>
                </ContactProvider>
            </ThemeProvider>
        </NotificationProvider>
    );
}
