import React, {useState} from 'react'
import {SearchBar} from "../components/SearchBar/SearchBar";
import {SearchResultsList} from "../components/SearchBar/SearchResultsList";



const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <div className='home-page'>
        <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </div>
    </div>
  )
}

export default Home
