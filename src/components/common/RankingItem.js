import React, { Component, useEffect, useState } from "react";
import { history } from "../../helper/history";

export default function RankingItem(props) {
    const [isTitleHover, setIsTitleHover] = useState(false);
    const [isChapterHover, setIsChapterHover] = useState(false);
    function handleTitleClick() {
      history.push(`/mangas/${props.mangaid}`);
      window.location.reload();
    }

    function handleChapterClick() {
      history.push(`/mangas/${props.mangaid}/chapters/${props.latestChapterId}`);
      window.location.reload();
    }

    return (
      <li class="py-2 mx-2 border-top" >
        <div class="row g-0">
          <div class="col-2 d-flex align-items-center justify-content-center">
            <div class="roster rounded-circle" style={{ fontSize: "larger", }}>
              {props.index + 1}
            </div>
          </div>
          <div class="col-10">
            <div class="row">
              <div class="thumbnail col-3">
                <img class = "rounded" src={props.thumbnail} width={60} height={60} style = {{objectFit : "cover"}}/>
              </div>
  
              <div class="col-9 position-relative d-flex justify-content-start">
                <div className="manga-title text-start" style = {{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                }}>
                  <a
                    href="#"
                    style={{
                      fontWeight: "bolder",
                      color: isTitleHover ? "var(--orange-dark)" : "black",

                    }}
                    onMouseEnter={() => setIsTitleHover(true)}
                    onMouseLeave={() => setIsTitleHover(false)}
                    onClick={() => handleTitleClick()}
                  >
                    {props.mangaTitle}
                  </a>
                </div>
  
                <div
                  className="latest-chapter position-absolute bottom-0 text-start"
                  style={{ width: "100%" }}
                >
                  <div class="row g-0">
                    <div class="col">
                      <a
                        href="#"
                        style={{
                          color: isChapterHover ? "var(--orange-dark)" : "black",
                        }}
                        onMouseEnter={() => setIsChapterHover(true)}
                        onMouseLeave={() => setIsChapterHover(false)}
                        onClick={() => handleChapterClick()}
                      >
                        {props.latestChapterTitle}
                      </a>
                    </div>
                    <div
                      class="col d-flex align-items-center"
                      style={{ color: "gray" }}
                    >
                      <span class="material-symbols-outlined">
                        {props.rankingIcon}
                      </span>
                      <span class="ms-2">{props.rankingNumbers}</span>
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
  