import React, { Component, useEffect, useState } from "react";
import Header from "../../common/Header";
import Navigation from "../../common/Navigation";
import { Outlet } from "react-router";
import Footer from "../../common/Footer";
import { MainContentTitle } from "../../home/HomePage";
import MangaService from "../../../services/manga.service";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Popup } from "../../common/Popup";
const CHAPTER_TITLE_COLUMN_WIDTH = "15%";
const MANGA_TITLE_COLUMN_WIDTH = "55%";
const UPLOAD_DATETIME_COLUMN_WIDTH = "20%";
const ACTIONS_COLUMN_WIDTH = "10%";

export function Dashboard(props) {
  return (
    <div>
      <Header />
      <Navigation />
      <main class="my-4" style={{ minHeight: "800px" }}>
        <div class="container">
          <MainContent user={props.user} />
        </div>
      </main>
      <Footer />
      <Outlet />
    </div>
  );
}

function MainContent(props) {
  const [uploadedChapters, setUploadedChapters] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(0);
  const [message, setMessage] = useState("");

  function closePopup() {
    setShow(false);
  }

  function openPopup(chapterid) {
    setSelectedChapterId(chapterid);
    setShow(true);
  }

  function deleteChapter() {
    MangaService.deleteChapter(selectedChapterId, props.user.username)
      .then((res) => {
        setShow(false);
        window.location.reload();
      })
      .catch(function (ex) {
        setMessage(ex);
      });
  }

  useEffect(() => {
    MangaService.getAllUploadedChapter()
      .then((res) => {
        setUploadedChapters(res.data);
      })
      .catch(function (ex) {
        console.log(ex);
      });
  }, []);

  return (
    <div className="main-content">
      <MainContentTitle title="Danh Sách Các Chương Manga Đã Đăng Tải" />
      <div className="upload-chapter-table fs-5">
        <table width="100%">
          <tr>
            <th width={CHAPTER_TITLE_COLUMN_WIDTH} className="text-start">
              Chương
            </th>
            <th width={MANGA_TITLE_COLUMN_WIDTH}>Manga</th>
            <th width={UPLOAD_DATETIME_COLUMN_WIDTH}>Ngày Đăng Tải</th>
            <th width={ACTIONS_COLUMN_WIDTH}></th>
          </tr>
          {uploadedChapters.map((chapter) => (
            <UploadItem chapter={chapter} openPopup={openPopup} />
          ))}
        </table>
      </div>
      {show && (
        <Popup
          type="confirm"
          message="Bạn chắc chắn muốn xóa chương này chứ?"
          closePopup={closePopup}
          confirmAction={deleteChapter}
          error={message}
          chapterid={selectedChapterId}
        />
      )}
    </div>
  );
}

function UploadItem(props) {
  const [manga, setManga] = useState([]);
  const [datetime, setDateTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    MangaService.findMangaByChapterId(props.chapter.id)
      .then((res) => {
        setManga(res.data);
      })
      .catch(function (ex) {
        setMessage(ex);
      });

    MangaService.getUploadedDateTimeByChapterId(props.chapter.id)
      .then((res) => {
        setDateTime(res.data);
      })
      .catch(function (ex) {
        setMessage(ex);
      });
  }, []);

  return (
    <tr>
      <td width={CHAPTER_TITLE_COLUMN_WIDTH} className="text-start">
        <Link to={`/mangas/${manga.id}/chapters/${props.chapter.id}`}>
          {" "}
          {props.chapter.title + " " + props.chapter.optional}
        </Link>
      </td>
      <td width={MANGA_TITLE_COLUMN_WIDTH} className="text-start">
        <Link to={`/mangas/${manga.id}`}>{manga.title}</Link>
      </td>
      <td width={UPLOAD_DATETIME_COLUMN_WIDTH}> {datetime}</td>
      <td width={ACTIONS_COLUMN_WIDTH}>
        <div>
          <Link
            to={`chapters/${props.chapter.id}/detail`}
            className="show-info-button me-2"
          >
            <span class="material-symbols-outlined btn btn-outline-primary p-0">
              info
            </span>
          </Link>
          <Link to={`chapters/${props.chapter.id}/edit`} className="me-2">
            <span class="material-symbols-outlined btn btn-outline-warning p-0">
              edit
            </span>
          </Link>
          <span
            className="delete-button"
            onClick={() => props.openPopup(props.chapter.id)}
          >
            <span class="material-symbols-outlined btn btn-outline-danger p-0">
              delete
            </span>
          </span>
        </div>
      </td>
    </tr>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;

  return {
    isLoggedIn,
    user,
  };
}

export default connect(mapStateToProps)(Dashboard);
