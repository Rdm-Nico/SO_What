import React, {Component} from 'react'

export class DentaturaApi extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: "" };
    }

    callAPI(){
        fetch("http://localhost:9000/dentaturaAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err);

        console.log(this.state.apiResponse);
    }

    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div className='home'>
                <p className='home'>{this.state.apiResponse}</p>
            </div>
        );
    }
}


