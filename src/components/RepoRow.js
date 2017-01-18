import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class RepoRow extends Component{

    render(){
        let repoInfo = this.props.repoInfo;
        //console.log('repoInfo:',repoInfo);
        let repoName = repoInfo.forksCount<=20 ? <span style={{color: 'red'}}>{repoInfo.repoName}</span> : repoInfo.repoName; 

        return (
            <tr >
                <td>{repoName}</td>
                <td>{repoInfo.forksCount}</td>
            </tr>            
        )
    }
}