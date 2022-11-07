import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import MangaService from "../../services/manga.service";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import ChapterForm from "./ChapterForm";
import UltraBigTitle from "./UltraBigTitle";
import BackArrow from "./BackArrow";

export function UploadChapter(props) {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="pages-main mt-5 mb-5">
        <div class="container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <MainContent user={props.user} />
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function MainContent(props) {
  const { mangaid } = useParams();
  const [manga, setManga] = useState([]);

  useEffect(() => {
    MangaService.findMangaById(mangaid)
      .then((res) => {
        setManga(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center" width ="100%">
      <BackArrow title="Trở lại Manga" link = "../"/>
      <UltraBigTitle actionName="Thêm chương cho truyện" object={manga.title} />
      <ChapterForm isAddNew = {true}/>
    </div>
  );
}


function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}




export default connect(mapStateToProps)(UploadChapter);
