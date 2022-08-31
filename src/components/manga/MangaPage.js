import React, { Component, useEffect, useState } from "react";
import RankingSidebar from "../common/RankingSidebar";
import HeaderComponent from "../common/Header";
import NavigationComponent from "../common/Navigation";
import Footer from "../common/Footer";
import { connect } from "react-redux";
import MainContent from "./MainContent";
import ChapterPage from "../chapter/ChapterPage";
export function MangaPage(props) {
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

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(MangaPage);
