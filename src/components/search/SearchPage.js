import React, { Component, useEffect, useState, useRef } from "react";
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import UltraBigTitle from "../chapter/UltraBigTitle";
import SearchForm from "./SearchForm";
import MangaItem from "../home/MangaItem";
import Pagination from "../home/Pagination";
import ReactLoading from "react-loading";
import SearchService from "../../services/SearchService";
import { history } from "../../helper/history";
import { useSearchParams } from "react-router-dom";

export default class SearchPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <main class="my-4">
          <div class="container" style={{ minHeight: "800px" }}>
            <MainContent />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

function MainContent() {
  const [totalPages, setTotalPages] = useState(0);
  const [mangas, setMangas] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const keywordsParam = searchParams.get("keywords");
  const unSelectedGenresParam = searchParams.get("unSelectedGenres");
  const selectedGenresParam = searchParams.get("selectedGenres");

  // repoPage is the page in the manga repository
  // pageParam is page number in url
  const currRepoPage = pageParam ? pageParam - 1 : 0;
  const currKeywords = keywordsParam ? keywordsParam : "";
  const currUnSelectedGenres = unSelectedGenresParam
    ? unSelectedGenresParam
    : "";
  const currSelectedGenres = selectedGenresParam ? selectedGenresParam : "";

  const [repoPage, setRepoPage] = useState(currRepoPage);
  const [keywords, setKeywords] = useState(currKeywords);
  const [unSelectedGenres, setUnSelectedGenres] =
    useState(currUnSelectedGenres);
  const [selectedGenres, setSelectedGenres] = useState(currSelectedGenres);

  function loadMangaOnPage(repoPage) {
    const page = Number(repoPage) + 1;
    history.push(
      `/search/result?keywords=${keywords}&selectedGenres=${selectedGenres}&unSelectedGenres=${unSelectedGenres}&page=${page}`
    );
    window.location.reload();
    // setRepoPage(repoPage);
  }

  function search(keywords, selectedGenres, unSelectedGenres) {
    setMangas([]);
    setError("");
    setTotalPages(0);
    setIsLoading(true);
    history.push(
      `/search/result?keywords=${keywords}&selectedGenres=${selectedGenres}&unSelectedGenres=${unSelectedGenres}&page=1`
    );

    window.location.reload();
    // setKeywords(keywords);
    // setSelectedGenres(selectedGenres);
    // setUnSelectedGenres(unselectedGenres);
  }

  const firstUpdate = useRef(true);

  useEffect((e) => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }

    // not search if all the param is empty
    if (!keywords && !unSelectedGenres && !selectedGenres) {
      return;
    }

    setIsLoading(true);
    SearchService.getSearchedMangas(
      keywords,
      repoPage,
      selectedGenres,
      unSelectedGenres
    )
      .then((res) => {
        setMangas(res.data.mangas);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch(function (e) {
        if (e.response && e.response.data) {
          console.log(e.response.data.message); // some reason error message
          setError(e.response.data.message);
        }
        // console.log(error);
        // setError(error.response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <UltraBigTitle object="Tìm Kiếm Nâng Cao" />
      <SearchForm
        search={search}
        init={{ keywords, selectedGenres, unSelectedGenres }}
      />
      <div className="mangas-grid mt-3">
        <div className="loading d-flex justify-content-center ">
          {isLoading && <ReactLoading type="balls" color="var(--blue-dark)" />}
        </div>
        <div
          className="mangas-grid"
          style={{ opacity: isLoading ? "60%" : "100%" }}
        >
          <div className="row">
            {mangas.map((manga) => (
              <div class="col-2">
                <MangaItem manga={manga} />
              </div>
            ))}
          </div>
        </div>
        {error && <div>{error}</div>}
        {totalPages > 0 && (
          <div>
            <Pagination
              totalPages={totalPages}
              loadMangaOnPage={loadMangaOnPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
