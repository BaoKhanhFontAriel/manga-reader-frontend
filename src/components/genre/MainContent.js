import React from "react";
import PropTypes from "prop-types";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import mangaService from "../../services/manga.service";
import MangaItem from "../home/MangaItem";
import { history } from "../../helper/history";
import Pagination from "../home/Pagination";

MainContent.propTypes = {};

function MainContent(props) {
  const { genre, sortBy } = useParams();
  const [error, setError] = useState("");
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  // repoPage is the page in the manga repository
  // pageParam is page number in url
  const currRepoPage = pageParam ? pageParam - 1 : 0;
  const [repoPage, setRepoPage] = useState(currRepoPage);

  const initialState =
    "border border-warning bg-light rounded-pill px-3 py-1 me-2";
  const selectState = "alert alert-warning rounded-pill px-3 py-1 me-2";
  const style = {
    cursor: "pointer",
  };
  const [select, setSelect] = useState(sortBy);

  function handleSortClick(item, genre) {
    // setSelect(item);

    genre === undefined
      ? history.push(`/genres/${item}`)
      : history.push(`/genres/${genre}/${item}`);
    window.location.reload();
  }

  useEffect(() => {
    mangaService
      .findMangaListByGenreSortBy(genre, select, currRepoPage)
      .then((res) => {
        setMangas(res.data.mangas);
        setTotalPages(res.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, [currRepoPage]);

  function handleGenreClick(genre) {
    history.push(`/genres/update`);
    window.location.reload();
  }

  function loadMangaOnPage(repoPage) {
    repoPage++;
    history.push(`?page=${repoPage}`);
    window.location.reload();
    // setRepoPage(repoPage);
  }

  return (
    <div className="category-main" style={{ minHeight: "500px" }}>
      <div className="map d-flex ">
        <span>
          <Link to="/">Trang chủ</Link>
        </span>
        <span className="d-flex align-items-center">
          <span class="material-symbols-outlined ">navigate_next</span>
          <span>
            <a href="" onClick={() => handleGenreClick("")}>
              Thể loại
            </a>
          </span>
        </span>
        {genre !== undefined && (
          <span className="d-flex align-items-center">
            <span class="material-symbols-outlined ">navigate_next</span>
            <span>
              <Link to={`/genres/${genre}/update`}>{genre}</Link>
            </span>
          </span>
        )}
      </div>
      <div className="title fs-2 mt-4">
        {genre === undefined ? (
          <div className="genre-all">
            <span>Tất cả các truyện </span>
          </div>
        ) : (
          <div className="genre-not-all">
            <span>Truyện thể loại: </span>
            <span className="fw-bold">{genre}</span>
          </div>
        )}
      </div>
      <div className="sort-by text-start mt-4">
        <div className="row g-0">
          <div className="col-2">
            <span className="title">Sắp xếp theo:</span>
          </div>
          <div className="col-10">
            <span
              className={select === "update" ? selectState : initialState}
              onClick={() => handleSortClick("update", genre)}
              style={style}
            >
              Mới cập nhật
            </span>
            <span
              className={select === "top-view" ? selectState : initialState}
              onClick={() => handleSortClick("top-view", genre)}
              style={style}
            >
              Top lượt xem
            </span>
            <span
              className={select === "top-favorite" ? selectState : initialState}
              onClick={() => handleSortClick("top-favorite", genre)}
              style={style}
            >
              Top theo dõi
            </span>
          </div>
        </div>
      </div>
      <div className="manga-grid me-4 mb-5 mt-2">
        <div className="row">
          {mangas.map((manga) => (
            <div class="col-3">
              <MangaItem manga={manga} />
            </div>
          ))}
          <div className="col-3"></div>
        </div>
        <Pagination
          totalPages={totalPages}
          loadMangaOnPage={loadMangaOnPage}
        ></Pagination>
      </div>
    </div>
  );
}

export default MainContent;
