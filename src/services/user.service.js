import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/users/";
const MANGA_READER_APP_URL = "http://localhost:8070/api";

class UserService {
  getUserDetail(id) {
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }
  addNewUser(data) {
    return axios.post(API_URL + "/add", data, { headers: authHeader() });
  }

  editUserDetail(id, data) {
    return axios.put(API_URL + `/edit/${id}`, data, { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL + `/delete/${id}`, { headers: authHeader() });
  }
  getFavoriteMangaByUsername(username) {
    return axios.get(`${MANGA_READER_APP_URL}/users/${username}/favorites`, {
      headers: authHeader(),
    });
  }

  isMangaFavoritedByUser(mangaid, username) {
    return axios.get(
      `${MANGA_READER_APP_URL}/users/is-favorited?mangaid=${mangaid}&username=${username}`,
      { headers: authHeader() }
    );
  }

  addMangaToFavorite(mangaid, username) {
    return axios.get(
      `${MANGA_READER_APP_URL}/users/add-favorite?mangaid=${mangaid}&username=${username}`,
      { headers: authHeader() }
    );
  }

  removeMangaFromFavorite(mangaid, username) {
    return axios.get(
      `${MANGA_READER_APP_URL}/users/remove-favorite?mangaid=${mangaid}&username=${username}`,
      { headers: authHeader() }
    );
  }
}
export default new UserService();
