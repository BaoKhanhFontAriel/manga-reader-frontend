import logo from "./logo.svg";
import "./App.css";

import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import MangaService from "./services/MangaService";
import MangaPage from "./components/MangaPage";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import ChapterPage from "./components/ChapterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="mangas">
          <Route path=":mangaid" element={<MangaPage />}></Route>
          {/* <Route path=":genre" element={<MangaPage />}></Route> */}
        </Route>
        <Route path="mangas">
          <Route path=":mangaid">
            <Route path="chapters">
              <Route path=":chapterid" element={<ChapterPage />}></Route>
            </Route>
          </Route>
          {/* <Route path=":genre" element={<MangaPage />}></Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
