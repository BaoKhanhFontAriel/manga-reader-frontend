import manga.service from "../services/MangaService";
import { SELECT_MANGA, UNSELECT_MANGA } from "./types";
export const selectManga = (mangaid) => (dispatch) => {
  return manga.service.findMangaById(mangaid).then((res) => {
    dispatch({
      type: SELECT_MANGA,
      payload: res.data,
    });
    console.log(res.data);
    return Promise.resolve();
  });
};

export const unselectManga = () => (dispatch) => {
  dispatch({ type: UNSELECT_MANGA });
};
