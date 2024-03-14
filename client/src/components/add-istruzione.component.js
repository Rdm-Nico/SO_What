import React, {Component} from 'react';
import IstruzioneDataService from "../services/istruzione.service";

class AddIstruzione extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeReparto = this.onChangeReparto.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this)
        this.saveIstruzione = this.saveIstruzione.bind(this);
        this.newIstruzione = this.newIstruzione.bind(this);

        this.state = {
            id: null,
            title: "",
            reparto: "",
            file: null,

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onChangeReparto(e) {
        this.setState({reparto: e.target.value});
    }

    onChangeFile(e) {
        const new_title = (name) => {
            // facciamo il parsing per tirare via il .doc .pdf ecc...
            const original_name = name
            const startIndex = original_name.indexOf('.')
            const new_name = original_name.slice(0,startIndex);

            return new_name
        }

        this.setState({file: e.target.files[0],
                            title: new_title(e.target.files[0].name)});
    }

    saveIstruzione(){
        const form = new FormData()

        form.append('title', this.state.title)
        form.append('reparto', this.state.reparto)
        form.append('file', this.state.file)


        IstruzioneDataService.create(form)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    reparto: response.data.reparto,
                    // in teoria qua si deve aggiungere anche il file

                    submitted: true
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })


    }

    newIstruzione(){
        this.setState({
            id: null,
            title: "",
            reparto: "",
            file: null,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>File inviati correttamente !</h4>
                        <button className="btn btn-success" onClick={this.newIstruzione}>
                            Add
                        </button>
                    </div>
                ): (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Titolo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reparto">Reparto</label>
                            <input
                                type="text"
                                className="form-control"
                                id="reparto"
                                required
                                value={this.state.reparto}
                                onChange={this.onChangeReparto}
                                name="reparto"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                required
                                onChange={this.onChangeFile}
                                name="file"
                            />
                        </div>

                        <button onClick={this.saveIstruzione} className="btn btn-success">
                            Invia
                        </button>

                    </div>
                )}
            </div>
        );
    }
}

export default AddIstruzione;