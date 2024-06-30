import React, {useEffect, useState} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import {useNavigate } from 'react-router-dom';
import {SidebarData} from "./SideBar/SidebarData";
import Sidebar from "./SideBar/Sidebar";
import AuthService from "../services/auth.service";


export default function AddIstruzione(){
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        // get the user and find if can see this page
        const user = AuthService.getCurrentUser()

        if (user){
            setCurrentUser(user)
            setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
            setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
        }
    }, []);

    const [istruzione, setIstruzione] = useState({
        id: null,
        title: "",
        reparto: "",
        file: null,

        url: "",
        submitted: false
    });
    let navigate = useNavigate();
    const reparti = SidebarData[0].subNav

    function handleTitleChange(e){
        setIstruzione({
            ...istruzione,
            title: e.target.value
        })
        console.log(showModeratorBoard)
        console.log(showAdminBoard)
        console.log(currentUser)
    }
    function handleRepartoChange(e){
        console.log(e.target.value)
        setIstruzione({
            ...istruzione,
            reparto: e.target.value
        })
    }
    function handleFileChange(e){
        const new_title = (name) => {
            // facciamo il parsing per tirare via il .doc .pdf ecc...
            const original_name = name
            const startIndex = original_name.indexOf('.')
            let new_name;
            new_name = original_name.slice(0, startIndex);

            return new_name
        }

        setIstruzione({
            ...istruzione,
            file: e.target.files[0],
            title: new_title(e.target.files[0].name)
        })
    }
    function saveIstruzione(){
        const data = new FormData()
        data.append('title', istruzione.title)
        data.append('reparto', istruzione.reparto)
        data.append('file', istruzione.file)

        IstruzioneDataService.create(data)
            .then(response => {
                console.log(response.data.path)

                setIstruzione({
                    ...istruzione,
                    id: response.data.id,
                    title: response.data.title,
                    reparto: response.data.reparto,
                    url: response.data.path,
                    submitted: true
                })
            })
            .catch(e => {
                console.log(e)
            })
    }
    function newIstruizone(){
        setIstruzione({
            id: null,
            title: "",
            reparto: "",
            file: null,

            url: "",
            submitted: false
        })
    }
    return (
        <div> { showAdminBoard || showModeratorBoard ? (
            <div className="submit-form">
                {istruzione.submitted ? (
                    <div>
                        <h4>File inviati correttamente !</h4>

                        <button className="btn btn-success" onClick={newIstruizone}>
                            Add
                        </button>
                        <button className="btn btn-success" onClick={() => {navigate('/')}}>
                            Home
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Titolo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={istruzione.title}
                                onChange={handleTitleChange}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reparto">Reparto:</label>
                            <select  name="reparti_list" className="form-control" id="reparto" onChange={handleRepartoChange}>
                                {
                                     reparti.map((reparto,index) => (
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
                                onChange={handleFileChange}
                            />
                        </div>

                        <button onClick={saveIstruzione} className="btn btn-success">
                            Invia
                        </button>

                    </div>
                    )}
            </div>): (
            <div>
                <h1>Errore</h1>
                Non hai l'autorizzazione per accedere a questa pagina. Si prega prima di fare il Login
                <button className="btn btn-success" onClick={() => {
                    navigate('/')
                }}>
                    Home
                </button>
            </div>
        )}
        </div>
    );
}
