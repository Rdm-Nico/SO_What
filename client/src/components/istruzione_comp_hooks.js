import React, {useEffect, useState} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import { useParams,useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import {SidebarData} from "./SideBar/SidebarData";
import "./Istruzione.css"
import {DialogWindowChoose} from "./DialogWindows_hooks";

export default function Istruzione() {

    const initialIstruzioneState = {
        id: null,
        title: "" ,
        path: "",
        reparto:""
    }
    const [istruzione,setIstruzione] = useState(initialIstruzioneState);
    const [showDialog, setShowDialog] = useState(false);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const { id } = useParams()
    const reparti = SidebarData[0].subNav


    const handleDeleteClick = file => {
        setShowDialog(true)
    }

    const getIstruzione = id => {

        IstruzioneDataService.get(id)
            .then(response => {
                console.log(response)
                /*ricordati che si posso cambiare le variabili dentro allo stato in questo modo:
                * ...istruzione,
                * K:V,
                *
                * se non avessimo messo ...istruzione:
                *   1. dovevamo modificare tutti i valori ( come effettivamente stiamo facendo)
                *
                * RICORDATI: I cambiamenti di stato vengono aggiornati al prossimo render
                * */

                setIstruzione({
                    ...istruzione,
                    id: id,
                    title: response.data.title,
                    path: response.data.path,
                    reparto: response.data.reparto
                })
            })
            .catch(e => {
                console.log(e);
            });
    }
    useEffect(() => {
        getIstruzione(id)
        // look if the user is an admin or mod
        const user = AuthService.getCurrentUser()

        if (user){
            setCurrentUser(user)
            setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
            setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
        }
    }, [id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setIstruzione({
            ...istruzione,
            [name]: value
        })
    }
    const updateIstruzione = () => {
        IstruzioneDataService.update(istruzione.id,istruzione)
            .then(response => {
                console.log(response.data)
                setMessage('Istruzione Aggiornata')
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleCancelDelete = () => {
        setShowDialog(false)
    }

    const deleteIstruzione = () => {
        IstruzioneDataService.delete(istruzione.id)
            .then(response => {
                console.log(response.data);
                navigate('/')
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <div> { !(showAdminBoard || showModeratorBoard)  ? (
            <div  className="submit-form">
                {istruzione ? (
                    <div className="edit-form">
                        <h2>Istruzione n. {istruzione.id}</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Titolo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={istruzione.title}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reparto">Reparto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reparto"
                                    value={istruzione.reparto}
                                />
                            </div>

                            <iframe src={istruzione.path}
                                    title={istruzione.title}
                                    className="Iframe_doc"
                            ></iframe>


                        </form>
                    </div>
                ) : (
                    <div>
                        <h1> Errore nella pagina </h1>
                    <button className="home_button" onClick={() => {navigate('/')}}>HOME</button>
                    </div>
                )}
                <button className="home_button" onClick={() => {navigate('/')}}>HOME
                </button>
                <button className="prev_button" onClick={() => {navigate(-1)}}>Back</button>
            </div>): (
            <div className="submit-form">
                {istruzione ? (
                    <div className="edit-form">
                        <h2>Istruzione n. {istruzione.id}</h2>
                        <form>
                        <div className="form-group">
                                <label htmlFor="title">Titolo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={istruzione.title}
                                    onChange={handleInputChange}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="reparto">Reparto:</label>
                                <select name="reparto" className="select-control" id="reparto" value={istruzione.reparto}
                                        onChange={handleInputChange}>
                                    {
                                        reparti.map((reparto, index) => (
                                                <option key={index} value={reparto.title}> {reparto.title}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>

                            <iframe src={istruzione.path}
                                    title={istruzione.title}
                                    className="Iframe_doc"
                            ></iframe>

                        </form>
                    </div>
                ) : (
                    <div>
                        <h1> Errore nella pagina </h1>
                        <button className="home_button" onClick={() => {
                            navigate('/')
                        }}>HOME
                        </button>
                    </div>
                )}
                <button className="delete_button" onClick={handleDeleteClick}>
                    Elimina Istruzione
                </button>
                <DialogWindowChoose
                    show={showDialog}
                    handleClose={handleCancelDelete}
                    message={`Stai per eliminare l'istruzione ${istruzione.title}. L'operazione é irreversibile.`}
                    onConfirm={deleteIstruzione}
                    onCancel={handleCancelDelete}
                />
                <button
                    type="submit"
                    className="update_button"
                    onClick={updateIstruzione}
                >
                    Aggiorna Istruzione
                </button>
                <p>{message}</p>
                <button className="home_button" onClick={() => {
                    navigate('/')
                }}>HOME
                </button>
                <button className="prev_button" onClick={() => {
                    navigate(-1)
                }}>Back
                </button>
            </div>
        )}
        </div>
    );
}
