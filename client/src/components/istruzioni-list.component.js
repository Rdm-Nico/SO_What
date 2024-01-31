import React, {Component} from "react";
import IstruzioneDataService from "../services/istruzione.service"
import { Link } from "react-router-dom"


export default class IstruzioniLists extends Component{
    constructor(props) {
        super(props);
        this.retrieveIstruzioni = this.retrieveIstruzioni.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.searchReparto = this.searchReparto.bind(this);

      this.state = {
          istruzioni: [],
          currentIstruzione: null,
          currentIndex: -1,
          searchReparto: ""
      };
    }
    componentDidMount() {
        this.retrieveIstruzioni();
    }

    retrieveIstruzioni(){
        IstruzioneDataService.getAll()
            .then(response => {
                this.setState({
                    istruzioni: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList(){
        this.retrieveIstruzioni();
        this.setState({
            currentIstruzione: null,
            currentIndex: -1
        });
    }

    searchReparto(){
        IstruzioneDataService.findByReparto(this.state.searchReparto)
            .then(response =>{
                this.setState({
                    istruzioni: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render(){
        
    }
}

