import React, { Component, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import MangaService from "../../services/manga.service";
import Footer from "../common/Footer";
import HeaderComponent from "../common/Header";
import Navigation from "../common/Navigation";
import { Link } from "react-router-dom";

export default class ChapterPage extends Component {
  
  render() {
    console.log("ChapterPage");

    return (
      <div>
        <HeaderComponent />
        <Navigation />
        <div className="pages-main">
          <div class="container">
            <MainContent />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}



function MainContent() {
  const [pages, setPages] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [manga, setManga] = useState([]);

  const { chapterid, mangaid } = useParams();
  useEffect(() => {
    MangaService.findMangaById(mangaid)
      .then((res) => {
        setManga(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
    MangaService.getChapterById(chapterid)
      .then((res) => {
        setChapter(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
    MangaService.getPagesByChapterId(chapterid)
      .then((res) => {
        setPages(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <>
      <div className="chapter-title mb-3">
        <span
          class="text-start"
          style={{ textTransform: "uppercase", fontSize: "x-large" }}
        >
          <Link to={`../`}>{manga.title}</Link> - {chapter.title}
        </span>
      </div>
      <div className="chapter-images">
        {pages.map((page) => (
          <img src={page}></img>
        ))}
      </div>
    </>
  );
}
