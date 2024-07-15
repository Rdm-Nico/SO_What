import React from 'react'
import { Button, Modal } from "flowbite-react";
import './Istruzione.css'




export function DialogWindowChoose({ show, handleClose, message, onConfirm, onCancel }) {
    return (
        <>
            <Modal show={show} onClose={handleClose} className="Model_window">
                <h2>Aspetta un attimo!</h2>
                <div className="text_dialog_window">

                    {message}
                </div>
                <div className="dialog_buttons">
                    <button onClick={onConfirm} className="button_dialog_on_delete"> Elimina</button>
                    <button onClick={onCancel} className="button_dialog_on_cancel"> Annulla</button>
                </div>
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


