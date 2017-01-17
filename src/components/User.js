import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class User extends Component{

    render(){
        return (
            <fieldset>
                <legend>基本資料</legend>                
                <img src="" alt="" />
                <br/>
                User Name:<span>test</span>
            </fieldset>

        )
    }
}