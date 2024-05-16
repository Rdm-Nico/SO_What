import React, {useState} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import { useParams,useNavigate } from 'react-router-dom';

export default function Istruzione() {
    const [istruzione,setIstruzione] = useState(GetIstruzione);
    let navigate = useNavigate();

    function GetIstruzione() {
        const { id } = useParams()
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
    return (
        <div>
            {istruzione ? (
                <div className="edit-form">
                    <h4>Istruzione</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
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
        </div>
    );
}
