import React, { Component, useState } from "react";
import TestThumbnail from "./TestThumbnail";

export default class RankingSidebar extends Component {
  render() {
    return (
      <div class="ranking-sidebar ">
        <RankingTable className="top-view-container" title="Top Luot Xem" />
        <RankingTable className="top-favorite-container" title="Top Theo Doi" />

        <div className="top-favorite-container"></div>
      </div>
    );
  }
}

function RankingTable(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={props.className} class="border mb-4">
      <a
        href="#"
        className="title d-flex  align-items-center border-bottom p-2 mx-2"
        style={{
          fontWeight: "bold",
          fontSize: "large",
          color: isHover ? "var(--orange-dark)" : "var(--red-lipstick)",
        }}
      >
        <span class="material-symbols-outlined">visibility</span>
        <span
          class="ms-2"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {props.title}
        </span>
      </a>

      <div className="content">
        <RankingItem></RankingItem>
        <RankingItem></RankingItem>
        <RankingItem></RankingItem>
      </div>
    </div>
  );
}

function RankingItem(props) {
  const [isTitleHover, setIsTitleHover] = useState(false);
  const [isChapterHover, setIsChapterHover] = useState(false);

  return (
    <li class="py-2 mx-2 border-top">
      <div class="row g-0">
        <div class="col-2 d-flex align-items-center justify-content-center">
          <div class="roster" style={{ fontSize: "larger" }}>
            01
          </div>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="thumbnail col-3">
              <TestThumbnail width="60px" height="60px" fit="cover" />
            </div>
            <div class="col-9 position-relative d-flex justify-content-start">
              <a
                href="#"
                className="manga-title"
                style={{
                  fontWeight: "bolder",
                  color: isTitleHover ? "var(--orange-dark)" : "black",
                }}
                onMouseEnter={() => setIsTitleHover(true)}
                onMouseLeave={() => setIsTitleHover(false)}
              >
                vo luyen dinh phong
              </a>
              <div
                className="chapter-ranking-number position-absolute bottom-0 text-start"
                style={{ width: "100%" }}
              >
                <div class="row">
                  <div class="col">
                    <a
                      href="#"
                      style={{
                        color: isChapterHover ? "var(--orange-dark)" : "black",
                      }}
                      onMouseEnter={() => setIsChapterHover(true)}
                      onMouseLeave={() => setIsChapterHover(false)}
                    >
                      Chapter 167
                    </a>
                  </div>
                  <div
                    class="col d-flex align-items-center"
                    style={{ color: "gray" }}
                  >
                    <span class="material-symbols-outlined">visibility</span>
                    <span class="ms-2">10M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
