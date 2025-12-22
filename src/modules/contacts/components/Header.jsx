import {useContacts} from "../context/ContactProvider.jsx";
import React from 'react';
import styles from './Header.module.css';
import moon from '../../../core/images/moon-2.png';
import add from '../images/add.png';
import recycle from '../images/recycling-bin.png';
import undo from '../images/undo.png';
import sun from '../../../core/images/sun.png';
import {useTheme} from "../../../core/index.js";


function Header() {

    const {
        setPage,
        selectMode,
        selectedContactIds,
        openBulkDeleteModal,
        searchContacts,
        setSearchContacts,
        toggleSelectMode,
    } = useContacts();

    const {
        theme,
        themeHandler,
    } = useTheme();

    return (
        <div className={styles.header}>
            <h5 className={theme === "light" ? styles.lightH5 : styles.darkH5}>جستجو در مخاطبین :</h5>
            <input
                type="text"
                value={searchContacts}
                onChange={(event) => setSearchContacts(event.target.value)}
            />
            {!selectMode && (
                <button onClick={() => toggleSelectMode()}>
                    <img src={recycle}/>
                </button>
            )}
            {selectMode && selectedContactIds.length > 0 && (
                <button onClick={() => openBulkDeleteModal()}>
                    <img src={recycle}/>
                </button>
            )}
            {selectMode && selectedContactIds.length === 0 && (
                <button onClick={() => toggleSelectMode()}>
                    <img src={undo}/>
                </button>
            )}
            <button onClick={() => setPage("addPage")}><img src={add} alt="logo"/></button>
            <button onClick={themeHandler}><img src={theme === "light" ? moon : sun} alt="logo"/></button>
        </div>
    );
}

export default Header;