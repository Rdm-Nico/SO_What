import React, {useEffect, useState} from 'react';
import IstruzioneDataService from "../../services/istruzione.service"
import { useParams,useNavigate } from 'react-router-dom';
import "../Istruzione.css"
import "../SearchBar/SearchResult.css"
import "./List_items.css"
import TableList from "./TableList";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function IstruzioniListsReparto(){
    const {reparto} = useParams()
    let navigate = useNavigate();
    const [lista, setLista] = useState({
        istruzioni: [],
        currentIstruzione: null,
        currentIndex: -1,
        reparto : reparto
    });
    const TOT_VALUES_PER_PAGE = 20;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [dataToDisplay, setDataToDisplay] = useState([]);

    useEffect(() => {
        const SearchList = () => {
            if(reparto === 'all'){
                //  all item
                IstruzioneDataService.getAll()
                    .then(response => {
                        setLista({
                            ...lista,
                            istruzioni: response.data
                        });
                        console.log('questo é tutti i valori',response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else{
                IstruzioneDataService.findByReparto(reparto)
                    .then(response =>{
                        setLista({
                            ...lista,
                            istruzioni: response.data
                        });
                        console.log('questo sono solo una parte di valori:',response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }

        if(reparto){
            SearchList()
            setLista({
                ...lista,
                currentIstruzione:null,
                currentIndex: -1
            })
            //setDataToDisplay(lista.istruzioni.slice(0,TOT_VALUES_PER_PAGE))
        }
        // we only display a certain amount of data
        //console.log(lista.istruzioni)
        //setDataToDisplay(lista.istruzioni.slice(0,TOT_VALUES_PER_PAGE))
        //console.log(dataToDisplay)
        // line of code for disable a warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reparto]);


    useEffect(() => {
        setDataToDisplay(lista.istruzioni.slice(0,TOT_VALUES_PER_PAGE))
    },[lista])

    useEffect(() => {
        const start = (currentPageNumber - 1) * TOT_VALUES_PER_PAGE;
        const end = currentPageNumber * TOT_VALUES_PER_PAGE;
        setDataToDisplay(lista.istruzioni.slice(start, end));
    }, [currentPageNumber]);

    const goOnPrevPage = () => {
        if (currentPageNumber === 1) return;
        setCurrentPageNumber((prev) => prev - 1);
    };
    const goOnNextPage = () => {
        if (currentPageNumber === lista.istruzioni.length / TOT_VALUES_PER_PAGE) return;
        setCurrentPageNumber((prev) => prev + 1);
    };
    const handleSelectChange = (e) => {
        setCurrentPageNumber(e.target.value);
    };

    return(
        <div>
            <h2>{reparto.toUpperCase()}</h2>
            {lista ? (
                    <div className="container">
                        <TableList dataToDisplay={dataToDisplay} />

                        <div className="button_pagination">
                            <FaAngleLeft onClick={goOnPrevPage}/>
                            {currentPageNumber}/{Math.ceil(lista.istruzioni.length/TOT_VALUES_PER_PAGE)}
                            <FaAngleRight onClick={goOnNextPage} />
                        </div>

                    </div>
            ) : (
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
