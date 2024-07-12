"use client";
import React from 'react'
import { Button, Modal } from "flowbite-react";





export function DialogWindowChoose({ show, handleClose, message, onConfirm, onCancel }) {
    return (
        <>
            <Modal show={show} onClose={handleClose}>
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Avviso</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}*/


