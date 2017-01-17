import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Repos extends Component{

    render(){
        return(
            <fieldset>
                <legend>專案資訊</legend>
                Project Name:<span></span>
                <br/>
                fork counts:<span></span>
            </fieldset>
        )
    }
}

