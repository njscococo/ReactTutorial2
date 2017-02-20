import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import axios from 'axios';

import GithubSearch from './components/GithubSearch';
//import SearchBar from './components/SearchBar';
// import User from './components/User';
// import Repos from './components/Repos';
// import RepoRow from './components/RepoRow';
// import PlayBack from './components/PlayBack';
import WebApiTest from './components/WebApiTest';

//import myState from './store/StateStore';
//加入mobx 管理狀態
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { GithubInfoStore, UserInputStore } from './store/GithubStore';

//github api
import githubApi from './utils/GithubApi';


class App extends Component {
  constructor(props) {
    super(props);
  }    

  render() {
    
    return (
      <div>
        <GithubSearch />
        <WebApiTest />
      </div>
    )
  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app'));
