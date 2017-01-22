//import { observable, computed, action } from 'mobx';
import { observable } from 'mobx';

const GithubInfoStore = observable(
    {
        userInfo: {
            login: '',
            id: 0,
            avatar_url: ''
        },
        userRepos: []
    }
);

const UserInputStore = observable({
    inputUserName: '',
    filterRepoName: '',
    isBelow20: false,
    stateIndex: 0
});

export { GithubInfoStore, UserInputStore}

