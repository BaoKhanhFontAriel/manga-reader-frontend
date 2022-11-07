import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { history } from "../../helper/history";
import mangaService from "../../services/manga.service";

export function CategoryDropdownMenu() {
  const categoryDropdownStyle = {
    position: "absolute",
    top: "100%",
    start: "0",
    width: "400px",
    marginLeft: "-10px",
  };

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    mangaService
      .getAllGenres()
      .then((res) => {
        setGenres(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={categoryDropdownStyle}
      class="category-dropdown-menu position-absolute shadow bg-body rounded"
    >
      <div class="row justify-content-start p-3 g-0">
        <div class="col-4">
          <DropdownItem text="Tất cả" link="" sortBy="update" />
        </div>
        {genres.map((genre) => (
          <div class="col-4">
            <DropdownItem text={genre} link={genre} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RankingDropdownMenu() {
  const rankingDropdownStyle = {
    position: "absolute",
    top: "100%",
    start: "0",
    width: "160px",
    marginLeft: "-10px",
  };

  return (
    <div
      style={rankingDropdownStyle}
      class="category-dropdown-menu position-absolute shadow p-3 bg-body rounded"
    >
      <DropdownItem text="Top Xem" link="" sortBy="top-view" />
      <DropdownItem text="Top Theo Dõi" link="" sortBy="top-favorite" />
    </div>
  );
}

function DropdownItem(props) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  function handleGenreClick(genre, sortBy) {
    console.log("genre click ", genre);
    genre === ""
      ? history.push(`/genres/${sortBy}`)
      : history.push(`/genres/${genre}/update`);
    window.location.reload();
  }

  const boxStyle = {
    backgroundColor: isHover ? "white" : "",
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "8px",
    cursor: "pointer",
  };

  const linkStyle = {
    color: isHover ? "orange" : "black",
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={boxStyle}
    >
      <a href="" onClick={() => handleGenreClick(props.link, props.sortBy)}>
        {props.text}
      </a>
    </li>
  );
}
