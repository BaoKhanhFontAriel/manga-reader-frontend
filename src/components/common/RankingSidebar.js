import React, { Component, useEffect, useState } from "react";
import TestThumbnail from "../TestThumbnail";
import MangaService from "../../services/manga.service";
import RankingItem from "./RankingItem";

export default function RankingSidebar() {
  return (
    <div class="ranking-sidebar ">
      <TotalViewsRankingTable />
      <FavoriteRankingTable />
      <div className="top-favorite-container"></div>
    </div>
  );
}

function TotalViewsRankingTable() {
  const [mangaList, setMangas] = useState([]);

  useEffect(() => {
    MangaService.getTop5MangasWithMostViews()
      .then((response) => {
        setMangas(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <div className="top-favorite-container" class="border mb-4">
      <TableTitle rankingTitle="Top Lượt Xem" icon="visibility" />
      <div className="content">
        {mangaList.map((manga, index) => (
          <TopViewsItem
            mangaid={manga.id}
            index={index}
            mangaTitle={manga.title}
            thumbnail={manga.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
}

function TopViewsItem(props) {
  const [latestChapter, setLatestChapter] = useState("latest chapter");
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    MangaService.getLatestChapterByMangaId(props.mangaid)
      .then((response) => {
        setLatestChapter(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.getTotalViewsByMangaId(props.mangaid).then((res) => {
      setTotalViews(res.data);
    });
  }, [totalViews, latestChapter.title]);

  return (
    <RankingItem
      mangaid={props.mangaid}
      index={props.index}
      mangaTitle={props.mangaTitle}
      thumbnail={props.thumbnail}
      latestChapterId ={latestChapter.id}
      latestChapterTitle={latestChapter.title}
      rankingNumbers={totalViews}
      rankingIcon="visibility"
    />
  );
}

function FavoriteRankingTable() {
  const [mangaList, setMangas] = useState([]);

  useEffect(() => {
    MangaService.findTop5MangasByFavorite()
      .then((response) => {
        setMangas(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <div className="top-favorite-container" class="border mb-4">
      <TableTitle rankingTitle="Top Theo Dõi" icon="favorite" />
      <div className="content">
        {mangaList.map((manga, index) => (
          <FavoritesItem
            mangaid={manga.id}
            index={index}
            mangaTitle={manga.title}
            thumbnail={manga.thumbnailUrl}
            rankingIcon="favorite"
          ></FavoritesItem>
        ))}
      </div>
    </div>
  );
}

function FavoritesItem(props) {
  const [latestChapter, setLatestChapter] = useState("latest chapter");
  const [favorites, setFavorites] = useState(0);

  useEffect(() => {
    MangaService.getLatestChapterByMangaId(props.mangaid)
      .then((response) => {
        setLatestChapter(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    MangaService.getFavoriteNumberByMangaId(props.mangaid).then((res) => {
      setFavorites(res.data);
    });
  }, []);

  return (
    <RankingItem
      mangaid={props.mangaid}
      index={props.index}
      mangaTitle={props.mangaTitle}
      thumbnail={props.thumbnail}
      latestChapterTitle={latestChapter.title}
      rankingNumbers={favorites}
      rankingIcon="favorite"
    ></RankingItem>
  );
}

function TableTitle(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      href="#"
      className="title d-flex align-items-center border-bottom p-2 mx-2"
      style={{
        fontWeight: "bold",
        fontSize: "large",
        color: isHover ? "var(--orange-dark)" : "var(--red-lipstick)",
      }}
    >
      <span class="material-symbols-outlined">{props.icon}</span>
      <span
        class="ms-2"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.rankingTitle}
      </span>
    </a>
  );
}
