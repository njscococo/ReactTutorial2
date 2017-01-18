import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Repos extends Component {

    render() {
        return (
            <fieldset>
                <legend>專案資訊</legend>
                <table>
                    <thead>
                        <tr>
                            <th>Project_Name</th>
                            <th>Fork_Counts</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </fieldset>
        )
    }
}

