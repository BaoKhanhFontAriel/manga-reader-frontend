import axios from "axios";
const API_URL = "http://localhost:8070/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          const user = response.data
          localStorage.setItem("user", JSON.stringify(user));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(fullname, email, username, password) {
    return axios.post(API_URL + "signup", {
      fullname,
      email,
      username,
      password,
    });
  }
}
export default new AuthService();
