import { useState } from "react";
import { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuickLook from "./QuickLook";

export default function MangaItem(props) {
  const [show, setShow] = useState(false);
  const [waitShow, setWaitShow] = useState(false);
  const firstUpdate = useRef(true);

  const manga = props.manga;
  const timer = null;
  const handleMouseEnter = () => {
    // setWaitShow(true);
    setShow(true)
  };

  const handleMouseLeave = () => {
    // setWaitShow(false);
    setShow(false);
  };

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }

  //   let timer = null;
  //   if (waitShow) {
  //     timer = setTimeout(() => {
  //       setShow(true);
  //     }, 500);
  //   }

  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [waitShow]);

  return (
    <div
      class="manga-item position-relative"
      id={"manga-item-" + manga.id}
      style={{ marginTop: "10px", marginBottom: "10px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/mangas/${manga.id}`}>
        <img
          width={"100%"}
          height={"300px"}
          style={{ objectFit: "cover" }}
          class="rounded border"
          src={manga.thumbnailUrl}
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
          {manga.title}
        </div>
      </Link>
      {show && <QuickLook manga={manga} setShow={setShow} />}
    </div>
  );
}
