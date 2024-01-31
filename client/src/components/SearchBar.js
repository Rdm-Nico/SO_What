import React, {useState} from 'react';
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css"
import istruzioneService from "../services/istruzione.service";

export const SearchBar = () => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        istruzioneService.findByTitle(value)
            .then((response) =>{
                const results = response.data.filter((istruzione) =>{
                    return (
                        value &&
                        istruzione &&
                        istruzione.title
                    );
                });
                console.log(results);
            })
        /*
        istruzioneService.getAll()
            .then((response) => {
            // filter the data
            const results = response.data.filter((istruzione) =>{
                // if the value is empty we don't want to display it
                return  value
                    && istruzione
                    && istruzione.title
                    && istruzione.title.toLowerCase().includes(value)
            });
            console.log(results);
            });

         */
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value);
    }
    return (
        <div className="input-wrapper">
        <FaSearch id="search-icon" />
            <input placeholder='ricerca istruzione...'
                   value={input}
                   onChange={(e) => handleChange(e.target.value)}/>
        </div>
    );
};

