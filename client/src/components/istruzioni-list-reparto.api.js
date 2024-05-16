import React, {Component} from "react";
import IstruzioneDataService from "../services/istruzione.service"

export default class IstruzioniListsReparto extends Component{
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.searchReparto = this.searchReparto.bind(this);
        this.state = {
            istruzioni: [],
            currentIstruzione: null,
            currentIndex: -1,
            reparto : props.name
        };

    }
    componentDidMount() {
        this.searchReparto();
    }

    searchReparto(){
        if(this.state.reparto === null){
            // all item
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
        else{
        IstruzioneDataService.findByReparto(this.state.reparto)
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
    refreshList(){
        this.searchReparto();
        this.setState({
            currentIstruzione: null,
            currentIndex: -1
        });
    }

    render(){
        const {istruzioni , currentIstruzione, currentIndex, reparto } = this.state;

        return(
            <div className='TableList'>
                <table>
                    <thead>
                    <tr>
                        <th>Titolo</th>
                        <th>Reparto</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        istruzioni.map((istruzione, index) =>
                        <tr key={index}>
                            <td className='table-name'>{istruzione.title}</td>
                            <td className='table-reparto'>{istruzione.reparto}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
