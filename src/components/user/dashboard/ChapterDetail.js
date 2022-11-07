import React, { Component } from "react";
import Header from "../../common/Header";
import Navigation from "../../common/Navigation";
import Footer from "../../common/Footer";
import MangaService from "../../../services/manga.service";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UltraBigTitle from "../../chapter/UltraBigTitle";
import BackArrow from "../../chapter/BackArrow";
import { history } from "../../../helper/history";

export default class ChapterDetail extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <div className="pages-main">
          <div className="container">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
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
  const [datetime, setDatetime] = useState("");

  const { chapterid, mangaid } = useParams();


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
    MangaService.getUploadedDateTimeByChapterId(chapterid)
      .then((res) => {
        setDatetime(res.data);
      })
      .catch(function (ex) {
        setMessage(ex);
      });
  }, []);

  function handleClick() {
    history.push(`./edit`);
    window.location.reload();
  }

  return (
    <div
      className="d-flex flex-column align-items-center mb-5 mt-5"
      style={{ minHeight: "580px" }}
    >
      <BackArrow title="Trở Lại Dashboard" link="/user/dashboard" />
      <UltraBigTitle
        actionName="Thông tin"
        object={chapter.title + " - " + manga.title}
      />

      <div className="form-area border rounded p-4 ">
        <div class="row g-3 align-items-center text-start mb-3">
          <div class="col-3">Tên chương</div>
          <div class="col-9">{chapter.title}</div>
        </div>
        <div class="row g-3 align-items-center text-start mb-3">
          <div class="col-3">Ghi chú</div>
          <div class="col-9">{chapter.optional}</div>
        </div>
        <div class="row g-3 align-items-center text-start mb-3">
          <div class="col-3">Tên manga</div>
          <div class="col-9">{manga.title}</div>
        </div>
        <div class="row g-3 align-items-center text-start mb-5">
          <div class="col-3">Link trang</div>
          <div class="col-9">{chapter.pageUrls}</div>
        </div>
        <div class="row g-3 align-items-center text-start mb-5">
          <div class="col-3">Ngày cập nhật</div>
          <div class="col-9">{datetime}</div>
        </div>

        <div class="row g-3 align-items-center text-start mb-5">
          <div class="col-3">Lượt xem</div>
          <div class="col-9">{chapter.views}</div>
        </div> 

        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => handleClick()}>
            Sửa thông tin
          </button>
        </div>
      </div>
    </div>
  );
}
