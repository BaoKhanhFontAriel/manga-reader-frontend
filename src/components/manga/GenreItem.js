
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
export function GenreItem(props) {
    const [isHover, setIsHover] = useState(false);
  
    const style = {
      color: isHover ? "white" : "black",
      border: "1px solid var(--orange-dark)",
      backgroundColor: isHover ? "var(--orange-dark)" : "",
    };
  
    return (
      <Link
        to={`mangas/${props.genre}`}
        class="rounded-pill px-2 py-1 me-2"
        style={style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.genre}
      </Link>
    );
  }