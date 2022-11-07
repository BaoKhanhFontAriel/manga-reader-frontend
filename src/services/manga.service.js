import axios from "axios";
import authHeader from "../services/auth-header";

// const MANGA_READER_APP_URL = "http://localhost:8070/api";
const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;

class MangaService {
  getAllMangasInPage(page) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas?page=${page}`);
  }

  getTop5MangasWithMostViews() {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/top/most-views`);
  }

  getLatestChapterByMangaId(mangaId) {
    return axios.get(
      `${MANGA_READER_APP_URL}/mangas/${mangaId}/chapters/latest`
    );
  }

  getTotalViewsByMangaId(mangaId) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/${mangaId}/total-views`);
  }

  getFavoriteNumberByMangaId(mangaId) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/${mangaId}/favorites`);
  }

  findTop5MangasByFavorite() {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/top/most-favorites`);
  }

  findMangaById(mangaid) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/${mangaid}`);
  }

  getGenresByMangaId(mangaid) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/${mangaid}/genres`);
  }

  getUpdateDateTimeByMangaId(mangaid) {
    return axios.get(
      `${MANGA_READER_APP_URL}/mangas/${mangaid}/update-datetime`
    );
  }

  findChapterListByMangaId(mangaid) {
    return axios.get(`${MANGA_READER_APP_URL}/mangas/${mangaid}/chapters`);
  }

  getChapterById(chapterid) {
    return axios.get(`${MANGA_READER_APP_URL}/chapters/${chapterid}`);
  }

  getPagesByChapterId(chapterid) {
    return axios.get(`${MANGA_READER_APP_URL}/chapters/${chapterid}/pages`);
  }

  getUploadedDateTimeByChapterId(chapterid) {
    return axios.get(
      `${MANGA_READER_APP_URL}/chapters/${chapterid}/uploaded-datetime`
    );
  }

  addNewChapter(mangaid, data) {
    return axios.post(
      `${MANGA_READER_APP_URL}/mangas/${mangaid}/upload-chapter`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  getAllUploadedChapter() {
    return axios.get(`${MANGA_READER_APP_URL}/user/upload-chapters`, {
      headers: authHeader(),
    });
  }

  findMangaByChapterId(chapterid) {
    return axios.get(`${MANGA_READER_APP_URL}/chapters/${chapterid}/manga`);
  }

  editChapter(chapterId, chapterDetail) {
    return axios.put(
      `${MANGA_READER_APP_URL}/chapters/${chapterId}/edit`,
      chapterDetail,
      {
        headers: authHeader(),
      }
    );
  }

  deleteChapter(chapterId, username) {
    return axios.delete(
      `${MANGA_READER_APP_URL}/chapters/${chapterId}/delete?username=${username}`,
      {
        headers: authHeader(),
      }
    );
  }

  getAllGenres() {
    return axios.get(`${MANGA_READER_APP_URL}/genres`);
  }


  findMangaListByGenreSortBy(genre, sortBy, page) {
    return axios.get(
      `${MANGA_READER_APP_URL}/mangas/find-manga?genre=${genre}&sortBy=${sortBy}&page=${page}`
    );
  }
}

export default new MangaService();
