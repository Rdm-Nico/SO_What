import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export function DialogWindowChoose({ show, handleClose, message, onConfirm, onCancel }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Conferma</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Annulla
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Elimina
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export  function DialogWindow({ show, handleClose, message }) {
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
}


