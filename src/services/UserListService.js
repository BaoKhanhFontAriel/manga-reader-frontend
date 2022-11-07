import axios from "axios";
import authHeader from "./auth-header";

const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = MANGA_READER_APP_URL + "/users";

class UserListService {
  addNewUser(data) {
    return axios.post(API_URL + "/add", data, { headers: authHeader() });
  }

  findUserByEmail(email) {
    return axios.get(API_URL + `/user?email=${email}`, {
      headers: authHeader(),
    });
  }

  changePasswordFromUserId(userId, newPassword) {
    let request = {
      rawPassword: newPassword,
    };

    return axios.post(API_URL + `/${userId}/change-password`, request);
  }
}
export default new UserListService();
