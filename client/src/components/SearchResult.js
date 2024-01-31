import React from 'react';

import "./SearchResult.css"

export const SearchResult = ({result}) => {
    return (
        <div className="search-result" onClick={(e) => alert(`You click on ${result.id}`)}>
            {result.title} <span className={result.reparto}>{result.reparto}</span> </div>
    );
}

