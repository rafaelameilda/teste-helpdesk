import { HttpClientService } from "./http-client.service";


export class AuthService extends HttpClientService{

  userLoggedKey = 'com.ciclocairu.winthor.user'

  login(payload) {
    return this.axios.post('signin', payload)
  }


  saveLocalStorage(data) {
    const _data = data
   localStorage.setItem(this.userLoggedKey, JSON.stringify(_data))
  }

  getUserFromLocalStorage() {
    const json = localStorage.getItem(this.userLoggedKey)
    if(json) {
      return JSON.parse(json)
    }

    return null;
  }

  logout() {
    localStorage.removeItem(this.userLoggedKey)
  }
}

export default new AuthService();
