import axios from 'axios';

class WebApi {
    
    getWebApiGet(id){        
        let apiurl = 'http://localhost:59219/api/ReactTest/' + id;
        //console.log('getGithubUser apiurl', apiurl);
        return axios.get(apiurl);
    }
}

const webApi = new WebApi();
export default webApi;