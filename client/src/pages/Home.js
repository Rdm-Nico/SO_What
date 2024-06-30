import React, {useState, useEffect} from 'react'
import {SearchBar} from "../components/SearchBar/SearchBar";
import {SearchResultsList} from "../components/SearchBar/SearchResultsList";
import UserService from "../services/user.service";


const Home = () => {
  const [results, setResults] = useState([]);
  const [content, setContent] = useState("")

  // for get the public content from the server-side
  useEffect(() => {
      UserService.getPublicContent()
          .then(
              (response) => {
                  setContent(response.data)
              }
          )
          .catch((error) => {
              const _content = (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              setContent(_content)
          })
  }, []);


  return (
    <div className='home-page'>

        <div className="search-bar-container">
            <h3> Testing: {content} </h3>
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </div>
    </div>
  )
}

export default Home
