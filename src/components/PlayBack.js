import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class PlayBack extends Component{

    render(){
        //console.log(this.props.stateIndex);
        let stateBtn =[] ;
        for(let i=0 ; i<=this.props.stateIndex; i++){
            stateBtn.push( <button value={i} key={i} onClick={this.props.handleBackBtn} >State: {i}</button>);
        }
        
        return (
            <div>
                {stateBtn}
            </div>
        )
    }
}