import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { history } from "../../helper/history";

export function GenreItem(props) {
  const [isHover, setIsHover] = useState(false);

  const style = {
    color: isHover ? "white" : "black",
    border: "1px solid var(--orange-dark)",
    backgroundColor: isHover ? "var(--orange-dark)" : "",
  };

  function handleGenreClick(genre) {
    console.log("genre click ", genre);
    genre === ""
      ? history.push(`/genres/update`)
      : history.push(`/genres/${genre}/update`);
    window.location.reload();
  }

  return (
    <span>
      <a
        href=""
        onClick={() => handleGenreClick(props.genre)}
        class="rounded-pill px-2 py-1 me-2 fs-6"
        style={style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.genre}
      </a>
    </span>

    // <Link
    //   to={`/genres/${props.genre}`}
    //   class="rounded-pill px-2 py-1 me-2"
    //   style={style}
    //   onMouseEnter={() => setIsHover(true)}
    //   onMouseLeave={() => setIsHover(false)}
    // >
    //   {props.genre}
    // </Link>
  );
}
