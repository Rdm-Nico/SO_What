import React from 'react';
import {Navigate} from "react-router-dom"

import "./SearchResult.css"

export const SearchResult = ({result}) => {
    return (
        <div className="search-result" onClick={(e) => <Navigate to={"/istruzione/" + result.id} replace={true}/>}>
            {result.title} <span className={result.reparto}>{result.reparto}</span> </div>
    );
}

