import axios from 'axios';

class GithubApi {
    constructor() {

    }
    //call api
    getGithubUser(userName) {
        let apiurl = 'https://api.github.com/users/' + userName;
        console.log('getGithubUser apiurl', apiurl);
        return axios.get(apiurl);
    }

    getGithubRepos(userName) {
        let apiurl = 'https://api.github.com/users/' + userName + "/repos";
        console.log('getGithubRepos apiurl', apiurl);
        return axios.get(apiurl);
    }

    getGithubAll(userName) {
        return axios.all([this.getGithubUser(userName), this.getGithubRepos(userName)])
    }
    //end: call api 

}

const githubApi = new GithubApi();
export default githubApi;

