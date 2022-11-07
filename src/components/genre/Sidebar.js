import React, { useState } from "react";
import PropTypes from "prop-types";
import mangaService from "../../services/manga.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContentTitle } from "../home/HomePage";
import { history } from "../../helper/history";

Sidebar.propTypes = {};

function Sidebar(props) {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    mangaService
      .getAllGenres()
      .then((res) => {
        setGenres(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleGenreClick(genre) {
    console.log("genre click ", genre);
    genre ==="" ? history.push(`/genres/update`) : history.push(`/genres/${genre}/update`);
    window.location.reload();
  }

  return (
    <aside
      className="border rounded text-start px-4 py-2 position-sticky"
      style={{ top: "60px" }}
    >
      <div className="row">
        <MainContentTitle title="Thể Loại" icon="list" />
        <div className="all-genre border-bottom border-top mt-2 py-2">
          <a href="" onClick={() => handleGenreClick("")}>
            Tất cả thể loại
          </a>
        </div>
        {genres.map((genre, index) =>
          index != genres.length - 1 ? (
            <div className="col-6 border-bottom py-2">
              <a href="" onClick={() => handleGenreClick(genre)}>
                {genre}
              </a>
            </div>
          ) : (
            <div className="col-6 py-2">
              <a href="" onClick={() => handleGenreClick(genre)}>
                {genre}
              </a>
            </div>
          )
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
