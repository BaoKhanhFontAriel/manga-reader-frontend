import React, { Component, useEffect, useState } from "react";
import RankingSidebar from "../common/RankingSidebar";
import MangaService from "../../services/manga.service";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import Navigation from "../common/Navigation";
import Pagination from "./Pagination";
import MangaItem from "./MangaItem";


export default function HomePage() {
  return (
    <div>
      <Header />
      <Navigation />
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
      <MainContentTitle title="Truyện Mới Cập Nhật " />
      <div class="manga-grid me-4 mb-5">
        <div class="row">
          {mangas.map((manga) => (
            <div class="col-3">
              <MangaItem
                mangaId={manga.id}
                thumbnailUrl={manga.thumbnailUrl}
                title={manga.title}
              />
            </div>
          ))}
        </div>
      </div>
      <div class="">
        <Pagination totalPages={mangas.length} />
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
      <span class="material-symbols-outlined" style={{}}>
        star
      </span>
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




