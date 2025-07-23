import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    const result = await post(`${this.BASE_URL}/auth/login?type=token`, { username, password });
    const accessToken = result.data.access_token;
    this.saveToken(accessToken);
    return result.data.uId;
  }

  async signup(name, username, password) {
    await post(`${this.BASE_URL}/auth/signup`, { name, username, password });
  }

  async signout() {
    this.removeToken();
  }
}
