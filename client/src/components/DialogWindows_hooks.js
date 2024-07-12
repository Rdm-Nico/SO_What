import React from 'react'
import { Button, Modal } from "flowbite-react";
import './Istruzione.css'




export function DialogWindowChoose({ show, handleClose, message, onConfirm, onCancel }) {
    return (
        <>
            <Modal show={show} onClose={handleClose} className="ciao">
                <h1>Aspetta un attimo!</h1>
                {message}
                <button onClick={onCancel}> Annulla</button>
                <button onClick={onConfirm}> Elimina</button>
            </Modal>
        </>
    );
}

/*export  function DialogWindow({ show, handleClose, message }) {
    return (
        <ReactDialogBox
            closeBox={show}
            modalWidth='60%'
            headerBackgroundColor='red'
            headerTextColor='white'
            headerHeight='65'
            closeButtonColor='white'
            bodyBackgroundColor='white'
            bodyTextColor='black'
            bodyHeight='200px'
            headerText='Title'
        >
            <div>
                <h1>Dialog Content</h1>
                {message}
                <button onClick={handleClose}> Chiudi</button>
            </div>
        </ReactDialogBox>
    );
}*/


