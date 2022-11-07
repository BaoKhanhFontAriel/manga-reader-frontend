import axios from "axios";

const MANGA_READER_APP_URL = process.env.REACT_APP_SERVER_URL;

class SearchService {
  getSearchedMangas(keywords, page, selectedGenres, unSelectedGenres) {
    return axios.get(
      `${MANGA_READER_APP_URL}/search/search-full?keywords=${keywords}&page=${page}&selectedGenres=${selectedGenres}&unSelectedGenres=${unSelectedGenres}`
    );
  }

  getQuickSearchedMangas(keywords) {
    return axios.get(
      `${MANGA_READER_APP_URL}/search/search-quick?keywords=${keywords}`
    );
  }
}

export default new SearchService();
