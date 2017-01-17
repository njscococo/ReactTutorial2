import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
//import User from './components/User';
//import Repos from './components/Repos';

class GithubSearch extends React.Component {
  constructor(props) {
    super(props);

    //設定state
    // this.state = {
    //   userName: '',
    //   repoName: '',
    //   checkBelow20: false
    // }

    //this.handlePlus = this.handlePlus.bind(this);
    //this.handlePlus = this.handlePlus.bind(this);
  }

  render() {
    return (
      <div>
        <SearchBar />
        <br />
        <User />
        <br />
        <Repos />
      </div>
    )
  }
}

class User extends Component{

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

class Repos extends Component{

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


ReactDOM.render(
  <GithubSearch />
  , document.getElementById('app'));
