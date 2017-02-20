import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import axios from 'axios';

import myState from '../store/StateStore';

import SearchBar from './SearchBar';
import User from './User';
import Repos from './Repos';
import RepoRow from './RepoRow';
import PlayBack from './PlayBack';

//加入mobx 管理狀態
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import { GithubInfoStore, UserInputStore } from '../store/GithubStore';

//github api
import githubApi from '../utils/GithubApi';

@observer
class GithubSearch extends Component {
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

  //事件綁定1：可以每個state單獨綁事件
  @action
  handleUserNameChange(e) {
    //console.log(e.target.value);
    // this.setState({
    //   inputUserName: e.target.value,
    //   stateIndex: this.state.stateIndex + 1
    // });
    UserInputStore.inputUserName = e.target.value;
    //console.log(GithubInfoStore, UserInputStore);
  }

  @action
  handleReposChange(e) {
    console.log(e.target.value);
    // this.setState({
    //   filterRepoName: e.target.value,
    //   stateIndex: this.state.stateIndex + 1
    // });
    UserInputStore.filterRepoName = e.target.value;
  }

  @action
  handleCheckBoxChange(e) {
    console.log(e.target.checked);
    // this.setState({
    //   isBelow20: e.target.checked,
    //   stateIndex: this.state.stateIndex + 1
    // });
    UserInputStore.isBelow20 = e.target.checked;
    UserInputStore.stateIndex = UserInputStore.stateIndex + 1;

  }
  //end：事件綁定1

  @action
  handleBtnClick(e) {
    githubApi.getGithubAll(UserInputStore.inputUserName).then(
      (result) => {
        let [user, repos] = result;
        //console.log(user.data, repos.data);
        /*
          用mobx，再也沒有setState
         */
        // this.setState({
        //   userInfo: {
        //     login: user.data.login,
        //     id: user.data.id,
        //     avatar_url: user.data.avatar_url
        //   },
        //   userRepos: repos.data,
        //   stateIndex: this.state.stateIndex + 1
        // });
        GithubInfoStore.userInfo = {
          login: user.data.login,
          id: user.data.id,
          avatar_url: user.data.avatar_url
        };
        GithubInfoStore.userRepos = repos.data;
      }
    );
  }

  //事件綁定2：也可以綁在一起，然後再用ref拿值
  // handleUserInput(userName, filterRepoName, isBelow20) {
  //   this.setState({
  //     inputUserName: userName,
  //     filterRepoName: filterRepoName,
  //     isBelow20: isBelow20
  //   });
  //   console.log('userName:', userName);
  //   console.log('filterRepoName:', filterRepoName);
  //   console.log('isBelow20:', isBelow20);
  // }
  //end：事件綁定2

  //mobx事件綁定2
  @action
  handleUserInput(key, value){
    key.type === "checkbox" ? UserInputStore[key.name] = (key.checked) : UserInputStore[key.name] = value;
  }

  onChange(e){
    //console.log(e.target);
    this.handleUserInput(e.target, e.target.value);
  }
  //end:mobx事件綁定2

  //倒帶模式
  handleBackBtn(e) {
    this.setState(myState.store.get(+e.target.value));
  }

  render() {
    myState.store.set(this.state.stateIndex, this.state);
    return (
      <div>
        <PlayBack stateIndex={this.state.stateIndex} handleBackBtn={this.handleBackBtn.bind(this)} />
        <fieldset>
          <legend>事件綁定1</legend>
          <SearchBar handleBtnClick={this.handleBtnClick}
            handleUserNameChange={this.handleUserNameChange}
            handleCheckBoxChange={this.handleCheckBoxChange}
            handleReposChange={this.handleReposChange}
            inputUserName={this.state.inputUserName}
            filterRepoName={this.state.filterRepoName}
            isBelow20={this.state.isBelow20} />
        </fieldset>

        <br />
        <fieldset>
          <legend>事件綁定2</legend>
          <SearchBar 
            handleBtnClick={this.handleBtnClick} 
            onChange= {this.onChange.bind(this)}/>
        </fieldset>

        <br />
        <User userInfo={GithubInfoStore.userInfo} />
        <br />

        <Repos userRepos={this.state.userRepos}
          filterRepoName={this.state.filterRepoName}
          isBelow20={this.state.isBelow20} />

        <Repos userRepos={GithubInfoStore.userRepos}
          filterRepoName={UserInputStore.filterRepoName}
          isBelow20={this.state.isBelow20} />
      </div>
    )
  }
}

export default GithubSearch;