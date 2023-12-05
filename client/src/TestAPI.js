import React, {Component} from 'react';

class TestApi extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: "" };
    }

    callAPI(){
        fetch("http://localhost:9000/testAPI")
            .then(res => res.next())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div className='home'>
                <p className='home'>ciaooo</p>
            </div>
        );
    }
}

export default TestApi;