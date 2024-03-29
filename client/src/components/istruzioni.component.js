import React, {Component} from 'react';
import IstruzioneDataService from "../services/istruzione.service";
import { withRouter } from "../common/with-router";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";

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
            message: ""
        };
    }


    componentDidMount() {
        this.getIstruzione(this.props.router.params.id);
    }
    getIstruzione(id) {
        IstruzioneDataService.get(id)
            .then(response => {
                this.setState({
                    currentIstruzione: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentIstruzione} = this.state;


        const upload = () => {
            const formData = new FormData()
            formData.append('')
            formData.append('prova',this.state.file)
            IstruzioneDataService.create(FormData)
                .then(res => {})
                .catch(er => console.log(er))
        }
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
                            <div className="doc-view">
                                <iframe style={{height: "100vh", width: "90vw"}} src={currentIstruzione.path} title="File-Viewer"></iframe>
                            </div>
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