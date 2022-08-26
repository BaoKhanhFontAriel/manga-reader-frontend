import React, { Component, useEffect, useState } from "react";
import RankingSidebar from "./RankingSidebar";
import MangaService from "../services/MangaService";
import HeaderComponent from "./HeaderComponent";
import NavigationComponent from "./NavigationComponent";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
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
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    MangaService.getAllMangasInPage(0)
      .then((response) => {
        setMangas(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <section class="main-content">
      <MainContentTitle />
      <div class="manga-grid me-4 mb-5">
        <div class="row">
          {mangas.map((manga) => (
            <MangaItem
              mangaId={manga.id}
              thumbnailUrl={manga.thumbnailUrl}
              title={manga.title}
            />
          ))}
        </div>
      </div>
      <div class="">
        <Pagination totalPages={mangas.length} />
      </div>
    </section>
  );
}

function MainContentTitle() {
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
      <span class="material-symbols-outlined" style={{}}>
        star
      </span>
      <span
        style={{
          marginLeft: "2px",
        }}
      >
        Truyện Mới Cập Nhật
      </span>
    </div>
  );
}

export function Pagination(props) {
  const [activePage, setActivePage] = useState(1);

  var pages = [];

  for (var i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }

  function handlePageChange(page) {
    setActivePage(page);
  }

  useEffect(() => {});

  return (
    <nav
      class="pagination d-flex justify-content-center"
      aria-label="Page navigation"
    >
      <ul class="pagination">
        <li class={activePage == 1 ? "page-item disabled" : "page-item"}>
          <a class="page-link disabled" href="#">
            &lt;
          </a>
        </li>

        {pages.map((page) => (
          <li class={page == activePage ? "page-item active" : "page-item"}>
            <a class="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li
          class={
            activePage == props.totalPages ? "page-item disabled" : "page-item"
          }
        >
          <a class="page-link" href="#">
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
}

function MangaItem(props) {
  return (
    <div class="col-3">
      <div
        class="manga-item"
        id={props.mangaId}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Link to= {`mangas/${props.mangaId}`}>
          <img
            width={"100%"}
            height={"300px"}
            style={{ objectFit: "cover" }}
            class="rounded border"
            src={props.thumbnailUrl}
          ></img>
          <div
            class="manga-title"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "large",
              color: "black",
              whiteSpace: "nowrap",
            }}
          >
            {props.title}
          </div>
        </Link>
      </div>
    </div>
  );
}
