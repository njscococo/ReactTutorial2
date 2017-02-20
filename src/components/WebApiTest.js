import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import webApi from '../utils/WebApi';

export default class WebApiTest extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            apiresult: ''
        };
    }
 
    componentDidMount(){
        let person
        webApi.getWebApiGet(13).then(
            (result)=> {
                console.log(result.data);
                this.setState({
                    apiresult: result.data
                });
            }
        );
    }

    render(){

        return (<div>result: {this.state.apiresult}</div>)
    }
}