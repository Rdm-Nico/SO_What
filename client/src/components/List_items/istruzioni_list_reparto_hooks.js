import React, {useEffect, useState} from 'react';
import IstruzioneDataService from "../../services/istruzione.service"
import { useParams,useNavigate } from 'react-router-dom';
export default function IstruzioniListsReparto(){
    const {reparto} = useParams()
    let navigate = useNavigate();
    const [list, setList] = useState({
        istruzioni: [],
        currentIstruzione: null,
        currentIndex: -1,
        reparto : reparto
    });



    useEffect(() => {
        const SearchList = () => {
            console.log(reparto)
            if(reparto === 'all'){
                //  all item
                IstruzioneDataService.getAll()
                    .then(response => {
                        setList({
                            ...list,
                            istruzioni: response.data
                        });
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else{
                IstruzioneDataService.findByReparto(reparto)
                    .then(response =>{
                        setList({
                            ...list,
                            istruzioni: response.data
                        });
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }

        if(reparto){
            SearchList()
            setList({
                ...list,
                currentIstruzione:null,
                currentIndex: -1
            })
        }
        // line of code for disable a warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reparto]);

    return(
        <div>
            <h1>{reparto}</h1>
            {list ? (
                <div className='TableList'>
                    <table>
                        <thead>
                        <tr>
                            <th>Titolo</th>
                            <th>Reparto</th>
                            <th>Azione</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.istruzioni.map((istruzione, index) =>

                                <tr key={index}>
                                    <td className='table-name'>{istruzione.title}</td>
                                    <td className='table-reparto'>{istruzione.reparto}</td>
                                    <td className="table-reparto">
                                        <button onClick={() => {
                                            navigate("/istruzione/" + istruzione.id)
                                        }}>GO
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>) : (
                <div>
                    <h1> Errore nella pagina </h1>
                    <button onClick={() => {
                        navigate('/')
                    }}>HOME
                    </button>
                </div>
            )
            }
        </div>
    )
}
