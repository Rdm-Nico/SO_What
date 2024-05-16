import React from 'react';
import {Link, Navigate} from "react-router-dom"

import "./SearchResult.css"

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    fontFamily: 'Merriweather'
};

export const SearchResult = ({result}) => {
    return (
        <Link className="link-result" to={"/istruzione/" + result.id} style={linkStyle} >
        <div className="search-result">
            {result.title} <span className={result.reparto}>{result.reparto}</span> </div>
        </Link>
    );
}

