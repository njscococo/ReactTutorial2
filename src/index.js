import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import User from './components/User';
import Repos from './components/Repos';

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

ReactDOM.render(
  <GithubSearch />
  , document.getElementById('app'));
