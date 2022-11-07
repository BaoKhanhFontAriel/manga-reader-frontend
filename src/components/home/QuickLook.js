import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "react-loading";
import mangaService from "../../services/manga.service";
import ReactLoading from "react-loading";

export default function QuickLook(props) {
  const [isLoading, setisLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [mousePosition, setmousePosition] = useState({});
  const manga = props.manga;
  const elementId = "manga-item-" + manga.id;
  const mangaEl = document.getElementById(elementId);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setisLoading(true);

    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    mangaService
      .getGenresByMangaId(manga.id)
      .then((res) => {
        setisLoading(false);
        setGenres(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    function onMouseMove(evt) {
      const { clientX, clientY } = evt;
      let rect = evt.target.getBoundingClientRect();
      setmousePosition({
        mouseX: clientX - rect.left + 12,
        mouseY: clientY - rect.top + 12,
      });
    }

    mangaEl.addEventListener("mousemove", onMouseMove);

    return () => {
      clearTimeout(timer);
      mangaEl.removeEventListener("mousemove", onMouseMove);
    };

    // return mangaEl.removeEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <div>
      {show && (
        <div
          className="quick-look border shadow rounded position-absolute text-start bg-white animate top-left-pop"
          onMouseOver={() => props.setShow(false)}
          onMouseLeave={() => props.setShow(true)}
          style={{
            width: "300px",
            zIndex: "1",
            //   minHeight: "400px",
            //   transform: "translate(-50%,-50%)",
            top: mousePosition.mouseY,
            left: mousePosition.mouseX,
          }}
        >
          {/* <div className="thumbnail " style={{}}>
          <img
            className=" rounded"
            src={manga.thumbnailUrl}
            style={{
              height: "180px",
              objectFit: "cover",
              width: "100%",
              objectPosition: "50% 30%",
            }}
          />
        </div> */}

          <div className="info p-2">
            <div
              className="title fw-bold mb-1"
              style={{ color: "var(--red-lipstick)" }}
            >
              {manga.title}
            </div>
            <div className="author fst-italic mb-2" style={{}}>
              {manga.author}
            </div>
            <div className="genres fw-italic" style={{}}>
              {genres.map((genre, index) => (
                <span
                  className="alert alert-warning rounded-pill px-2 py-1 me-1 d-inline-block"
                  id={genre}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="summart fw-italic " style={{}}>
              <span className="fw-bold">Tóm tắt: </span>
              <span> {manga.summary}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
