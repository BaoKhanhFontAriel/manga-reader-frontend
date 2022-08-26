import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import MangaService from "../services/MangaService";
import Footer from "./Footer";
import HeaderComponent from "./HeaderComponent";
import NavigationComponent from "./NavigationComponent";

export default class ChapterPage extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <NavigationComponent />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

function MainContent() {
  const [pages, setPages] = useState([]);
  const { chapterid } = useParams();
  useEffect(() => {
    MangaService.getPagesByChapterId(chapterid)
      .then((res) => {
        setPages(res.data);
        console.log(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <div className="chapter-images">
      {pages.map((page) => (
        <img src={page}></img>
      ))}
    </div>
  );
}

function chapterImageItem(value) {
  return <img src={value}></img>;
}
