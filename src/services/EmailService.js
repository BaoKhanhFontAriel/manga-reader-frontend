import axios from "axios";
import authHeader from "./auth-header";

const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = MANGA_READER_APP_URL + "/mail";

class EmailService {
  sendEmailForChangingPassword(email) {
    return axios.get(API_URL + `/${email}/change-password`);
  }

  sayHi() {
    console.log("Hi");
  }
}

export default new EmailService();
