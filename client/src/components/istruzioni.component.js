import React, {Component} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import { withRouter } from "../common/with-router";


class Istruzione extends Component {

    constructor(props){
        super(props);

        this.getIstruzione = this.getIstruzione.bind(this);

        this.state = {
            currentIstruzione: {
                id : null,
                title: "",
                path: "",
                reparto: ""
            },
            file: null,
            token: ""
        };
    }


    componentDidMount() {
        this.getIstruzione(this.props.router.params.id);
    }
    getIstruzione(id) {
        let token;
        IstruzioneDataService.get(id)
            .then(response => {
                console.log(response)
                this.setState({
                    currentIstruzione: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
        IstruzioneDataService.get_token(id)
            .then(response =>{
                console.log('token: ',response.data.token)
                // display pdf
                IstruzioneDataService.get_file(response.data.token)
                    .then(response =>{
                        console.log('response: ', response.data)
                        this.setState({
                            file: response.data
                        })
                        /*
                        // create blob
                        const blob = new Blob([response.data], {type:'application/pdf'})
                        console.log(blob)
                        // create uri
                        let imgUrl = URL.createObjectURL(blob)
                        console.log('url: ', imgUrl)
                        */

                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });

    }

    render() {
        const {currentIstruzione} = this.state;
        const {file} = this.state
        console.log('file: ',file)

        const backToPrevPage = () => {
            window.history.back();
        }
        return (
            <div>
                {currentIstruzione ? (
                    <div className="edit-form">
                        <h4>Istruzione</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentIstruzione.title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reparto">Reparto</label>
                                <input
                                type="text"
                                className="form-control"
                                id="reparto"
                                value={currentIstruzione.reparto}
                                />
                            </div>

                            <iframe src={"http://localhost:9000/api/istruzioni/view-file/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMjMiLCJpYXQiOjE3MTUyNTQ5ODQsImV4cCI6MTcxNTI1Njc4NH0.BbZtgG4QnjqMlK1wcXQfo4zkrVQJKnvLOjyxndybRc0"}
                                    title={currentIstruzione.title}
                                    width={2000}
                                height={900}
                            ></iframe>


                        </form>
                    </div>
                ):(
                    <button onClick={() => {this.props.navigation.navigate('/')}} >Back</button>
                )}
                <button onClick={backToPrevPage} >Back</button>
            </div>
        );
    }
}

export default withRouter(Istruzione);
