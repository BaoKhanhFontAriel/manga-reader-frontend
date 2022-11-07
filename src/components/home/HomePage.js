import React, { Component, useEffect, useState } from "react";
import RankingSidebar from "../common/RankingSidebar";
import MangaService from "../../services/manga.service";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Navigation from "../common/Navigation";
import Pagination from "./Pagination";
import MangaItem from "./MangaItem";
import { history } from "../../helper/history";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Navigation />
      <main class="my-4" style={{ minHeight: "800px" }}>
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
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  // repoPage is the page in the manga repository
  // pageParam is page number in url
  const repoPage = pageParam ? pageParam - 1 : 0;
  // const [index, setPage] = useState(index);

  function loadMangaOnPage(repoPage) {
    repoPage++;
    history.push(`/home?page=${repoPage}`);
    window.location.reload();
    // setPage(page);
  }

  useEffect(() => {
    MangaService.getAllMangasInPage(repoPage)
      .then((response) => {
        setMangas(response.data.mangas);
        setTotalPages(response.data.totalPages);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <section class="main-content">
      <MainContentTitle title="Truyện Mới Cập Nhật " />
      <div class="manga-grid me-4 mb-5">
        <div class="row">
          {mangas.map((manga) => (
            <div class="col-3">
              <MangaItem manga={manga} />
            </div>
          ))}
        </div>
      </div>
      <div class="">
        <Pagination totalPages={totalPages} loadMangaOnPage={loadMangaOnPage} />
      </div>
    </section>
  );
}

export function MainContentTitle(props) {
  return (
    <div
      class="title d-flex align-items-center"
      style={{
        textAlign: "left",
        color: "#D61C4E",
        fontSize: "larger",
        fontWeight: "bold",
      }}
    >
      {props.icon !== undefined ? (
        <span class="material-symbols-outlined">{props.icon}</span>
      ) : (
        <span class="material-symbols-outlined">star</span>
      )}

      <span
        style={{
          marginLeft: "2px",
        }}
      >
        {props.title}
        {/* Truyện Mới Cập Nhật */}
      </span>
    </div>
  );
}
