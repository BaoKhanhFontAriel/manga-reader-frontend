import axios from "axios";
import React, { Component } from "react";

const MANGA_READER_APP_URL = "http://localhost:8070";

class MangaService {
  getAllMangasInPage(page) {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas?page=${page}`);
  }

  getTop5MangasWithMostViews() {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas/top/most-views`);
  }

  getLatestChapterByMangaId(mangaId) {
    return axios.get(
      `${MANGA_READER_APP_URL}/api/mangas/${mangaId}/chapters/latest`
    );
  }

  getTotalViewsByMangaId(mangaId) {
    return axios.get(
      `${MANGA_READER_APP_URL}/api/mangas/${mangaId}/total-views`
    );
  }

  getFavoriteNumberByMangaId(mangaId) {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas/${mangaId}/favorites`);
  }

  findTop5MangasByFavorite() {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas/top/most-favorites`);
  }

  findMangaById(mangaid) {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas/manga?id=${mangaid}`);
  }

  getGenresByMangaId(mangaid) {
    return axios.get(`${MANGA_READER_APP_URL}/api/mangas/${mangaid}/genres`);
  }

  getUpdateDateTimeByMangaId(mangaid) {
    return axios.get(
      `${MANGA_READER_APP_URL}/api/mangas/${mangaid}/update-datetime`
    );
  }

  findChapterByMangaId(mangaid) {
    return axios.get(
      `${MANGA_READER_APP_URL}/api/mangas/${mangaid}/chapters`
    );
  }
}

export default new MangaService();
