import React, {useState} from 'react'
import {SearchBar} from "../components/SearchBar/SearchBar";
import {SearchResultsList} from "../components/SearchBar/SearchResultsList";
import ImgLocal from "../imgs/Logo-Rossi-Meccanica-50esimo-nero-a-rilievo.jpg"


const Home = () => {
  const [results, setResults] = useState([]);




  return (
    <div className='home-page'>
        <div className="container_img">
            <img src={ImgLocal} alt={"Immagine prova"} className="img_home" />
        </div>
        <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </div>
    </div>
  )
}

export default Home
