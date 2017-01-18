import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import SearchBar from './components/SearchBar';
import User from './components/User';
import Repos from './components/Repos';

class GithubSearch extends React.Component {
  constructor(props) {
    super(props);

    //設定state：找出state
    this.state = {
      userName: '',
      filterRepoName: '',
      isBelow20: false
    }

    this.handleBtnClick = this.handleBtnClick.bind(this);

    //事件綁定1
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleReposChange = this.handleReposChange.bind(this);

    //事件綁定2
    this.handleUserInput = this.handleUserInput.bind(this);
  }


  //call api
  getGithubUser(userName) {
    let apiurl = 'https://api.github.com/users/' + userName;
    return axios.get(apiurl);
  }

  getGithubRepos(userName) {
    let apiurl = 'https://api.github.com/users/' + userName + "/repos";
    return axios.get(apiurl);
  }

  getGithubAll(userName) {
    axios.all([this.getGithubUser(userName), this.getGithubRepos(userName)]).then(
      axios.spread(function (acct, perms) {
        console.log([acct.data, perms.data]);
      })
    );
  }
  //end: call api 

  //事件綁定1：可以每個state單獨綁事件
  handleUserNameChange(e) {
    console.log(e.target.value);
    // this.setState({
    //   userName: e.target.value
    // });
  }

  handleReposChange(e) {
    console.log(e.target.value);
    this.setState({
      filterRepoName: e.target.value
    });
  }

  handleCheckBoxChange(e) {
    console.log(e.target.checked);
    this.setState({
      isBelow20: e.target.checked
    });
  }
  //end：事件綁定1

  handleBtnClick(e) {
    //this.getGithubAll(this.state.userName);
    console.log(e.target);
  }
  

  //事件綁定2：也可以綁在一起，然後再用ref拿值
  handleUserInput(userName, filterRepoName, isBelow20) {
    this.setState({
      userName: userName,
      filterRepoName: filterRepoName,
      isBelow20: isBelow20
    });
    console.log('userName:', userName);
    console.log('filterRepoName:', filterRepoName);
    console.log('isBelow20:', isBelow20);
  }
  //end：事件綁定2

  render() {
    return (
      <div>
        <fieldset>
          <legend>事件綁定1</legend>
          <SearchBar handleBtnClick={this.handleBtnClick}
            handleUserNameChange={this.handleUserNameChange}
            handleCheckBoxChange={this.handleCheckBoxChange}
            handleReposChange={this.handleReposChange} />
        </fieldset>

        <br />
        <fieldset>
          <legend>事件綁定2</legend>
          <SearchBar handleUserInput={this.handleUserInput}
            handleBtnClick={this.handleBtnClick} />
        </fieldset>

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
