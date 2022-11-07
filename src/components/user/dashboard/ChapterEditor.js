import Header from "../../common/Header";
import Navigation from "../../common/Navigation";
import Footer from "../../common/Footer";
import ChapterForm from "../../chapter/ChapterForm";
import UltraBigTitle from "../../chapter/UltraBigTitle";
import BackArrow from "../../chapter/BackArrow";
import React, { Component, useEffect, useState } from "react";
import MangaService from "../../../services/manga.service";
import { connect } from "react-redux";
import { useParams } from "react-router";

export default class ChapterEditor extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <div className="pages-main mt-5 mb-5">
          <div class="container">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6 ">
                <MainContent />
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function MainContent(props) {
  const [chapter, setChapter] = useState([]);
  const [manga, setManga] = useState([]);
  const [message, setMessage] = useState([]);
  const { chapterid } = useParams();

  useEffect(() => {
    MangaService.getChapterById(chapterid)
      .then((res) => {
        setChapter(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.findMangaByChapterId(chapterid)
      .then((res) => {
        setManga(res.data);
      })
      .catch(function (ex) {
        setMessage(ex);
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center" width="100%">
      <BackArrow title="Trở lại Dashboard" link="/user/dashboard" />
      <UltraBigTitle
        actionName="Cập nhật thông tin cho"
        object={chapter.title + " - " + manga.title}
      />
      <ChapterForm isEdit = {true}/>
    </div>
  );
}
