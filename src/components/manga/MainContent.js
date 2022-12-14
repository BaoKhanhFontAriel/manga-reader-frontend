import React from "react";
import { Navigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import MangaService from "../../services/manga.service";
import { GenreItem } from "./GenreItem";
import MangaPageFavoritebutton from "./MangaPageFavoriteButton";
import { ChapterTable } from "./ChapterTable";
import { DetailItem } from "./DetailItem";
import { connect, useDispatch } from "react-redux";
import { history } from "../../helper/history";
import Notification from "../common/notification/Notification";

export function MainContent(props) {
  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [updateDatetime, setUpdateDatetime] = useState([]);
  const [chapters, setChapters] = useState([]);

  let { mangaid } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    MangaService.findMangaById(mangaid)
      .then((res) => {
        setManga(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.getGenresByMangaId(mangaid)
      .then((res) => {
        setGenres(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.getTotalViewsByMangaId(mangaid)
      .then((res) => {
        setTotalViews(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.getUpdateDateTimeByMangaId(mangaid)
      .then((res) => {
        setUpdateDatetime(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.findChapterListByMangaId(mangaid)
      .then((res) => {
        setChapters(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  function handleCLick() {
    history.push(`/mangas/${mangaid}/upload-chapter`);
    window.location.reload();
  }

  return (
    <div style={{ fontSize: "larger" }}>
      <div
        className="manga-title"
        class="mb-4"
        style={{
          fontSize: "28px",
          textTransform: "Uppercase",
          color: "var(--red-lipstick)",
          fontWeight: "bolder",
        }}
      >
        {manga.title}
      </div>
      <div className="manga-info mb-3">
        <div class="row g-0">
          <div class="thumbnail col-4 d-flex justify-content-start ">
            <img
              class="rounded"
              src={manga.thumbnailUrl}
              width="260px"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div class="detail col-8 text-start">
            <DetailItem title="T??c gi???" item={manga.author} icon="face" />
            <DetailItem
              title="Th??? lo???i"
              item={genres.map((g) => (
                <GenreItem genre={g} />
              ))}
              icon="category"
            />
            <DetailItem title="L?????t xem" item={totalViews} icon="visibility" />
            <DetailItem title="C???p nh???t" item={updateDatetime} icon="update" />
            <DetailItem
              title="N???i dung"
              item={manga.summary}
              icon="summarize"
            />
            <MangaPageFavoritebutton />
          </div>
        </div>
      </div>

      <div className="manga-chapters">
        <div class="d-flex adjust-items-center border-bottom border-warning pb-2 position-relative">
          <span class="material-symbols-outlined me-2">list</span>
          <span style={{ fontWeight: "bolder" }}>DANH S??CH CH????NG</span>
          <button
            className="btn btn-warning position-absolute end-0"
            style={{ top: "-6px" }}
            onClick={handleCLick}
            disabled={!props.isLoggedIn}
          >
            Th??m Ch????ng M???i
          </button>
        </div>
        <ChapterTable chapters={chapters} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(MainContent);
