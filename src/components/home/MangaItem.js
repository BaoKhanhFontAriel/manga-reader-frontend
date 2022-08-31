
import {Link} from "react-router-dom"

export default function MangaItem(props) {
    return (
      <div
        class="manga-item"
        id={props.mangaId}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Link to={`/mangas/${props.mangaId}`}>
          <img
            width={"100%"}
            height={"300px"}
            style={{ objectFit: "cover" }}
            class="rounded border"
            src={props.thumbnailUrl}
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
            {props.title}
          </div>
        </Link>
      </div>
    );
  }