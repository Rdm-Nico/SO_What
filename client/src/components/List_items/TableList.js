import React, {useEffect} from "react";
import "../Istruzione.css"
import "../SearchBar/SearchResult.css"
import "./List_items.css"
import { useParams,useNavigate } from 'react-router-dom';


export default function TableList({dataToDisplay}){
    let navigate = useNavigate();

    useEffect(() => {
        console.log('questo é il contenuto:',dataToDisplay)
    }, [dataToDisplay]);

    return (
        <div className='TableList'>
            <table>
                <thead>
                <tr>
                    <th className="column_title_header">Titolo</th>
                    <th className="column_header">Reparto</th>
                    <th className="column_header">Azione</th>
                </tr>
                </thead>
                <tbody>
                {
                    dataToDisplay.map((istruzione, index) =>

                        <tr key={index}>
                            <td className='table-name'>{istruzione.title}</td>
                            <td className={istruzione.reparto} onClick={() => {
                                navigate("/reparti/" + istruzione.reparto)
                            }}> {istruzione.reparto} </td>
                            <td className="table-button">
                                <button className="button_list" onClick={() => {
                                    navigate("/istruzione/" + istruzione.id)
                                }}>GO
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
