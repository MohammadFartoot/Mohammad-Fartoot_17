import React, {useState, useEffect} from 'react';
import {useContacts} from "../context/ContactProvider.jsx";
import styles from './Contacts.module.css';
import Modal from "./Modal.jsx";
import inputs from "../constants/inputs.js";
import {v4} from "uuid";
import styles1 from "./Modal.module.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src/index.js";
import * as yup from "yup";
import {useNotifications} from "../../../core/index.js";


const contactSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\d{11}$/, "Phone number should be 11 digits").required("Phone number is required"),
})


function Contacts() {

    const [pendingData, setPendingData] = useState(null);
    const [confirmType, setConfirmType] = useState(null)
    const {showNotification} = useNotifications();


    const {
        page,
        setPage,
        addContact,
        editContact,
        updateContact,
        closeEditContact,
    } = useContacts();


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(contactSchema),
        defaultValues: {name: "", email: "", phone: ""}
    });


    useEffect(() => {
        if (editContact) {
            reset(editContact);
        }
    }, [editContact, reset]);

    const onSubmit = (data) => {
        setPendingData(data);
        setConfirmType(editContact ? "edit" : "add")
    }

    const confirmHandler = () => {
        if (editContact) {
            updateContact({...pendingData, id: editContact.id});
            showNotification("مخاطب با موفقیت ویرایش شد", "success");
            closeEditContact();
        } else {
            addContact({...pendingData, id: v4()});
            showNotification("مخاطب با موفقیت اضافه شد", "success");
        }
        reset({name: "", email: "", phone: ""});
        setPage("homePage");
        setConfirmType(null);
    }

    const cancelHandler = () => {
        closeEditContact();
        setPage("homePage");
        setConfirmType(null);
    }

    if (page === "addPage") {
        return (<>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {inputs.map((input, index) => (<div key={index} className={`${styles[input.name]} ${styles.container}`}>
                        <p>{input.label}</p>

                        <input
                            type={input.type}
                            {...register(input.name)}
                        />
                        <div className={styles.error}>
                            {errors[input.name] && <p>{errors[input.name]?.message}</p>}
                        </div>
                    </div>))}
                    <button type="submit">{editContact ? "اعمال تغییرات" : "افزودن"}</button>
                </form>

                {confirmType && (
                    <Modal onClose={() => cancelHandler}>

                        <h3 className={styles1.text}>
                            {confirmType === "edit"
                                ? "شما در حال ویرایش یکی از مخاطبین هستید"
                                : "شما در حال افزودن مخاطب جدید هستید"
                            }
                        </h3>
                        <h4 className={styles1.text}>آیا مطمئن هستید؟</h4>
                        <button className={styles1.confirmButton} onClick={() => confirmHandler()}>بله</button>
                        <button className={styles1.cancelButton} onClick={() => cancelHandler()}>انصراف</button>
                    </Modal>
                )}
            </>
        );
    }
}

export default Contacts;