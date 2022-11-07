import React, { useState, useEffect, useRef } from "react";
import { history } from "../../helper/history";
import SearchService from "../../services/SearchService";
import ReactLoading from "react-loading";
import MangaService from "../../services/manga.service";

export default function SearchBar() {
  const [mangas, setMangas] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState("");
  const firstUpdate = useRef(true);

  function handleInputChange(value) {
    if (value === "") {
      setShow(false);
      setLoading(false);
    } else {
      setKeywords(value);
      setLoading(true);
    }
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let timer = setTimeout(() => {
      SearchService.getQuickSearchedMangas(keywords)
        .then(
          (res) => {
            setMangas(res.data.mangas);
            setShow(true);
            setLoading(false);
          },
          (error) => {
            setMessage(error.response.message);
            setLoading(false);
          }
        )
        .catch(function (ex) {
          console.log("Response parsing failed. Error: ", ex);
        });
    }, 0);

    return () => clearTimeout(timer);
  }, [keywords]);

  return (
    <div class="search-box position-relative ">
      <input
        type="text"
        class="form-control position-relative"
        placeholder="Bạn muốn tìm truyện gì"
        aria-label="Username"
        aria-describedby="basic-addon1"
        style={{ zIndex: "3" }}
        onChange={(e) => handleInputChange(e.target.value)}
      ></input>

      <span
        class="material-symbols-outlined position-absolute top-0 end-0 mt-2 me-2"
        id="basic-addon1"
        style={{ zIndex: "3" }}
      >
        search
      </span>
      {loading && (
        <div
          className="loading position-absolute"
          style={{ zIndex: "3", right: "40px", top: "5px" }}
        >
          <ReactLoading type="balls" color="var(--blue-dark)" width={30} />
        </div>
      )}
      {show && (
        <SearchResultList error={message} mangas={mangas} keywords={keywords} />
      )}
    </div>
  );
}

function SearchResultList(props) {
  return (
    <div
      className="search-result-list border bg-white shadow rounded-bottom position-absolute top-100"
      style={{
        maxHeight: "300px",
        overflow: "auto",
        zIndex: "2",
        width: "100%",
        marginTop: "-6px",
        paddingTop: "6px",
      }}
    >
      <ul style={{ paddingLeft: "0", marginBottom: "0" }}>
        {props.mangas.map((manga) => (
          <SearchResult manga={manga} keywords={props.keywords} />
        ))}
        {props.message && <div>{props.message}</div>}
      </ul>
    </div>
  );
}

function SearchResult(props) {
  const [genre, setGenre] = useState([]);
  function handleClick() {
    history.push(`/mangas/${props.manga.id}`);
    window.location.reload();
  }

  useEffect(() => {
    MangaService.getGenresByMangaId(props.manga.id).then((res) => {
      setGenre(res.data);
    });
  }, []);

  return (
    <li class="py-2 border-bottom">
      <div onClick={() => handleClick()} style={{ cursor: "pointer" }}>
        <div class="row g-0">
          <div class="thumbnail col-3">
            <img
              class="rounded"
              src={props.manga.thumbnailUrl}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div class="col-9 position-relative d-flex-column text-start">
            <div
              className="manga-title "
              style={{
                fontWeight: "bolder",
                color: "black",
              }}
            >
              {props.manga.title}
            </div>
            <div className="author fst-italic">{props.manga.author}</div>
            <div className="genre fst-italic">
              {genre.map((value) => (
                <span>{value + " "}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

