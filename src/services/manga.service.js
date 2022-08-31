import axios from "axios";
import React, { Component } from "react";
import authHeader from "./auth-header";

const MANGA_READER_APP_URL = "http://localhost:8070/api";

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
    return axios.get(`${MANGA_READER_APP_URL}/mangas/manga?id=${mangaid}`);
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


}

export default new MangaService();
