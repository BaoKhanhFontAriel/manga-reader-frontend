import React, { Component, useEffect, useState } from "react";
import RankingSidebar from "./RankingSidebar";
import MangaService from "../services/MangaService";
import HeaderComponent from "./HeaderComponent";
import NavigationComponent from "./NavigationComponent";
import Footer from "./Footer";
import { useParams } from "react-router";
import TestThumbnail from "./TestThumbnail";
import { Link } from "react-router-dom";

export default function MangaPage() {
  return (
    <div>
      <HeaderComponent />
      <NavigationComponent />
      <main class="my-4">
        <div class="container">
          <div class="row">
            <div class="col-9">
              <MainContent />
            </div>
            <div class="col-3">
              <RankingSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MainContent() {
  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [updateDatetime, setUpdateDatetime] = useState([]);
  const [chapters, setChapters] = useState([]);

  let { mangaid } = useParams();

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
          <div class="col-4">
            <img src={manga.thumbnailUrl} />
          </div>
          <div class="col-8 text-start">
            <div className="author" class="mb-3">
              <div class="row g-0">
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined me-2">face</span>
                    <span> Tác giả</span>
                  </div>
                </div>
                <div class="col-9">{manga.author}</div>
              </div>
            </div>
            <div className="genre" class="mb-3">
              <div class="row g-0">
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined me-2">category</span>
                    <span>Thể loại</span>
                  </div>
                </div>
                <div class="col-9 ">
                  {genres.map((g) => (
                    <GenreItem genre={g} />
                  ))}
                </div>
              </div>
            </div>

            <div className="views" class="mb-3">
              <div class="row g-0">
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined me-2">
                      visibility
                    </span>
                    <span>Lượt xem</span>
                  </div>
                </div>
                <div class="col-9">{totalViews}</div>
              </div>
            </div>
            <div className="update" class="mb-3">
              <div class="row g-0">
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined me-2">update</span>
                    <span>Cập nhật</span>
                  </div>
                </div>
                <div class="col-9">{updateDatetime}</div>
              </div>
            </div>
            <div className="favorites-button">
              <button
                type="button"
                class="btn btn-primary d-flex align-items-center"
              >
                <span class="material-symbols-outlined me-2">favorite</span>
                <span>Theo dõi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="manga-summary mb-3">
        <div class="d-flex adjust-items-center border-bottom border-warning pb-2">
          <span class="material-symbols-outlined me-2">summarize</span>
          <span style={{ fontWeight: "bolder" }}> NỘI DUNG </span>
        </div>
        <div class="text-start"> {manga.summary}</div>
      </div>
      <div className="manga-chapters">
        <div class="d-flex adjust-items-center border-bottom border-warning pb-2">
          <span class="material-symbols-outlined me-2">list</span>
          <span style={{ fontWeight: "bolder" }}>DANH SÁCH CHƯƠNG</span>
        </div>
        <ChapterTable chapters={chapters} />
      </div>
    </div>
  );
}

function ChapterTable(props) {
  return (
    <table className="chapters-table" style={{ width: "100%" }}>
      <tr>
        <th class="text-start">Tên chương</th>
        <th>Cập nhật</th>
        <th>Lượt xem</th>
      </tr>
      {props.chapters.map((chapter) => (
        <tr>
          <td class="text-start">
            <Link to={`chapters/${chapter.id}`}>{chapter.title}</Link>
          </td>
          <td>
            {chapter.uploadedTime} {chapter.uploadedDate}
          </td>
          <td>{chapter.views}</td>
        </tr>
      ))}
    </table>
  );
}

function GenreItem(props) {
  const [isHover, setIsHover] = useState(false);

  const style = {
    color: isHover ? "white" : "black",
    border: "1px solid var(--orange-dark)",
    backgroundColor: isHover ? "var(--orange-dark)" : "",
  };

  return (
    <Link
      to={`mangas/${props.genre}`}
      class="rounded-pill px-2 py-1 me-2"
      style={style}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {props.genre}
    </Link>
  );
}
