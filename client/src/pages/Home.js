import React from 'react'
import {SearchBar} from "../components/SearchBar";



const Home = () => {
  return (
    <div className='home-page'>
        <div className="search-bar-container">
            <SearchBar />
            <div>SearchResults</div>
        </div>
    </div>
  )
}

export default Home
