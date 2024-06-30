import React, {useEffect, useState} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import { useParams,useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import {SidebarData} from "./SideBar/SidebarData";

export default function Istruzione() {

    const initialIstruzioneState = {
        id: null,
        title: "" ,
        path: "",
        reparto:""
    }
    const [istruzione,setIstruzione] = useState(initialIstruzioneState);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const { id } = useParams()
    const reparti = SidebarData[0].subNav

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
                        <h4>Istruzione</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Titolo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={istruzione.title}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reparto">Reparto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reparto"
                                    value={istruzione.reparto}
                                />
                            </div>

                            <iframe src={istruzione.path}
                                    title={istruzione.title}
                                    width={2000}
                                    height={900}
                            ></iframe>


                        </form>
                    </div>
                ) : (
                    <div>
                        <h1> Errore nella pagina </h1>
                    <button onClick={() => {navigate('/')}}>HOME</button>
                    </div>
                )}
                <button onClick={() => {navigate('/')}}>HOME
                </button>
                <button onClick={() => {navigate(-1)}}>Back</button>
            </div>): (
            <div className="submit-form">
                {istruzione ? (
                    <div className="edit-form">
                        <h4>Istruzione</h4>
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
                                <select name="reparto" className="form-control" id="reparto" value={istruzione.reparto}
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
                                    width={2000}
                                    height={900}
                            ></iframe>

                        </form>
                    </div>
                ) : (
                    <div>
                        <h1> Errore nella pagina </h1>
                        <button onClick={() => {
                            navigate('/')
                        }}>HOME
                        </button>
                    </div>
                )}
                <button className="badge badge-danger mr-2" onClick={deleteIstruzione}>
                    Elimina
                </button>
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateIstruzione}
                >
                    Aggiorna
                </button>
                <p>{message}</p>
                <button onClick={() => {
                    navigate('/')
                }}>HOME
                </button>
                <button onClick={() => {
                    navigate(-1)
                }}>Back
                </button>
            </div>
        )}
        </div>
    );
}
