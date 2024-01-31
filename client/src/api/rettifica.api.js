import React, {Component} from 'react'
import IstruzioneDataService from "../services/istruzione.service"

export class RettificaApi extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.searchReparto = this.searchReparto.bind(this);

        this.state = {
            istruzioni: [],
            currentIstruzione: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.searchReparto();
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
}