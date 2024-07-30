import React from 'react'
import { Button, Modal } from "flowbite-react";
import './Istruzione.css'
import {SidebarData} from "./SideBar/SidebarData";




export function DialogWindowDelete({ show, handleClose, message, onConfirm, onCancel }) {
    return (
        <>
            <Modal show={show} onClose={handleClose} className="modal_window">
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

export function DialogWindowUpdate({show, handleClose, onConfirm, onCancel, handleInputChange, istruzione}){

    const reparti = SidebarData[0].subNav

    return (
        <Modal show={show} onClose={handleClose} className="modal_window">
            {istruzione.submitted ? (
                    <div>
                        <h4>Istruzione Aggiornata correttamente !</h4>

                        <button className="button_dialog_on_cancel" onClick={handleClose}>
                            Chiudi
                        </button>
                    </div>
                ) :
                (<div>
                <div className="form-group">
                    <label htmlFor="title">Titolo:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={istruzione.title}
                        onChange={handleInputChange}
                        name="title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reparto">Reparto:</label>
                    <select name="reparti_list" className="select-control" id="reparto" onChange={handleInputChange} value={istruzione.reparto}>
                        {
                            reparti.map((reparto, index) => (
                                    <option key={index} value={reparto.title}> {reparto.title}</option>
                                )
                            )
                        }
                    </select>

                </div>
                <div className="form-group">
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="dialog_buttons">
                    <button onClick={onConfirm} className="button_dialog_on_submit"> Invia</button>
                    <button onClick={onCancel} className="button_dialog_on_cancel"> Annulla</button>
                </div>


            </div>)}
        </Modal>
    )
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


