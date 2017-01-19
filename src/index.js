import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import SearchBar from './components/SearchBar';
import User from './components/User';
import Repos from './components/Repos';
import RepoRow from './components/RepoRow';
import PlayBack from './components/PlayBack';

import myState from './store/stateStore';

class GithubSearch extends React.Component {
  constructor(props) {
    super(props);

    //設定state：找出state
    /*
      如何找出合適的state？inputUserName需要做為1個state嗎？
    */
    this.state = {
      inputUserName: '',
      filterRepoName: '',
      isBelow20: false,
      userInfo: {
        login: '',
        id: 0,
        avatar_url: ''
      },
      userRepos: [],
      stateIndex: 0 
    }
    
    //倒帶模式
    myState.store.set(this.state.stateIndex, this.state);

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
    //console.log('getGithubUser apiurl', apiurl);
    return axios.get(apiurl);
  }

  getGithubRepos(userName) {
    let apiurl = 'https://api.github.com/users/' + userName + "/repos";
    //console.log('getGithubRepos apiurl', apiurl);
    return axios.get(apiurl);
  }

  getGithubAll(userName) {
    axios.all([this.getGithubUser(userName), this.getGithubRepos(userName)]).then(
      (result) => {        
        let [user, repos] = result;
        //console.log(user.data, repos.data);
        this.setState({
          userInfo: {
            login: user.data.login,
            id: user.data.id,
            avatar_url: user.data.avatar_url
          },
          userRepos: repos.data,
          stateIndex: this.state.stateIndex+1
        });
      }    
    );
  }
  //end: call api 

  //事件綁定1：可以每個state單獨綁事件
  handleUserNameChange(e) {
    //console.log(this.state);
    this.setState({
      inputUserName: e.target.value,
      stateIndex: this.state.stateIndex+1
    });
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
    this.getGithubAll(this.state.inputUserName);
    //console.log(e.target);
  }

  //事件綁定2：也可以綁在一起，然後再用ref拿值
  handleUserInput(userName, filterRepoName, isBelow20) {
    this.setState({
      inputUserName: userName,
      filterRepoName: filterRepoName,
      isBelow20: isBelow20
    });
    console.log('userName:', userName);
    console.log('filterRepoName:', filterRepoName);
    console.log('isBelow20:', isBelow20);
  }
  //end：事件綁定2

  //倒帶模式
  handleBackBtn(e){
    this.setState(myState.store.get(+e.target.value));    
  }

  render() {
    //console.log('render:', this.state);
    //this.stateIdx++;
    myState.store.set(this.state.stateIndex, this.state);
    return (
      <div>
        <PlayBack stateIndex = {this.state.stateIndex} handleBackBtn={this.handleBackBtn.bind(this)}/>
        <fieldset>
          <legend>事件綁定1</legend>
          <SearchBar handleBtnClick={this.handleBtnClick}
            handleUserNameChange={this.handleUserNameChange}
            handleCheckBoxChange={this.handleCheckBoxChange}
            handleReposChange={this.handleReposChange} 
            value={this.state.inputUserName}/>
        </fieldset>

        <br />
        <fieldset>
          <legend>事件綁定2</legend>
          <SearchBar handleUserInput={this.handleUserInput}
            handleBtnClick={this.handleBtnClick} />
        </fieldset>

        <br />
        <User userInfo={this.state.userInfo}/>
        <br />
        <Repos userRepos={this.state.userRepos}
          filterRepoName={this.state.filterRepoName}
          isBelow20={this.state.isBelow20} />
      </div>
    )
  }
}

ReactDOM.render(
  <GithubSearch />
  , document.getElementById('app'));
