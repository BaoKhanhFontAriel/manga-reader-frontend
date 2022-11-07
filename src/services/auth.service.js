import axios from "axios";
// const API_URL = "http://localhost:8070/api/auth/";
// const MANGA_READER_APP_URL = "http://localhost:8070/api";
const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = MANGA_READER_APP_URL + "/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          return user;
        }
        return null;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  signup(fullname, email, username, password) {
    return axios.post(API_URL + "signup", {
      fullname,
      email,
      username,
      password,
    });
  }
}
export default new AuthService();
