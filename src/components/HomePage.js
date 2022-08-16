import React, { Component } from "react";
import RankingSidebar from "./RankingSidebar";

export default class HomePage extends Component {
  render() {
    return (
      <div class="container ">
        <div class="row">
          <div class="col-9">
            <div
              class="title d-flex align-items-center"
              style={{
                textAlign: "left",
                color: "#D61C4E",
                fontSize: "larger",
                fontWeight: "bold",
              }}
            >
              <span class="material-symbols-outlined" style={{}}>
                star
              </span>
              <span
                style={{
                  marginLeft: "2px",
                }}
              >
                {" "}
                Danh Sách Truyện
              </span>
            </div>
            <div class="manga-grid me-4">
              <div class="row">
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
                <MangaItem />
              </div>
            </div>
            <div class=""></div>
          </div>

          <div class="col-3">
            <RankingSidebar />
          </div>
        </div>
      </div>
    );
  }
}

function MangaItem(props) {
  return (
    <div class="col-3">
      <div
        class="manga-item "
        style={{ marginTop: "10px", marginBottom: "10px"}}
      >
        <a href="#">
          <img
            width={'100%'}
            class="rounded border"
            src="http://i.truyenvua.com/ebook/190x247/ket-thuc-nhat-dinh-se-co-hau_1627179577.jpg?r=r8645456"
          ></img>
          <div
            class="manga-title"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "large",
              color: "black",
              whiteSpace: "nowrap",
            }}
          >
            ket Thuc Nhat Dinh Se Co Hau asfasfas asfa fasfasf dasda
          </div>
        </a>
      </div>
    </div>
  );
}
