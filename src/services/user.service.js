import axios from "axios";
import authHeader from "./auth-header";

const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = MANGA_READER_APP_URL + "/user";

class UserService {
  getUserDetail() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  editUserDetail(data) {
    return axios.put(API_URL + `/edit`, data, { headers: authHeader() });
  }

  deleteUser() {
    return axios.delete(API_URL + `/delete`, { headers: authHeader() });
  }

  getFavoriteManga() {
    return axios.get(`${API_URL}/favorites`, {
      headers: authHeader(),
    });
  }

  isMangaFavoritedByUser(mangaid) {
    return axios.get(`${API_URL}/is-favorited?mangaid=${mangaid}`, {
      headers: authHeader(),
    });
  }

  addMangaToFavorite(mangaid) {
    return axios.get(`${API_URL}/add-favorite?mangaid=${mangaid}`, {
      headers: authHeader(),
    });
  }

  removeMangaFromFavorite(mangaid) {
    return axios.get(`${API_URL}/remove-favorite?mangaid=${mangaid}`, {
      headers: authHeader(),
    });
  }

  uploadImage(formData) {
    return axios.post(MANGA_READER_APP_URL + `/upload/image`, formData, {
      headers: authHeader(),
    });
  }

  isPasswordMatch(rawPassword) {
    let request = {
      rawPassword: rawPassword,
    };

    return axios.post(API_URL + `/check-password`, request, {
      headers: authHeader(),
    });
  }

  changePassword(newPassword) {
    let request = {
      rawPassword: newPassword,
    };

    return axios.post(API_URL + `/change-password`, request, {
      headers: authHeader(),
    });
  }



  isAdmin() {
    return axios.get(API_URL + "/is-admin", {
      headers: authHeader(),
    });
  }
}
export default new UserService();
