import { useState, useEffect } from "react";
import MangaService from "../../services/manga.service";
import { Link } from "react-router-dom";

export function ChapterTable(props) {
  return (
    <div>
      <table className="chapters-table" style={{ width: "100%" }}>
        <tr>
          <th class="text-start">Tên chương</th>
          <th>Cập nhật</th>
          <th>Lượt xem</th>
        </tr>
        {props.chapters.map((chapter) => (
          <tr>
            <td class="text-start">
              <Link to={`chapters/${chapter.id}`}>{chapter.optional? chapter.title + " (" + chapter.optional + ")": chapter.title} </Link>
            </td>
            <td>
              <UploadedDateTimeByChapterId chapterid={chapter.id} />
            </td>
            <td>{chapter.views}</td>
          </tr>
        ))}
      </table>

    </div>
  );
}

function UploadedDateTimeByChapterId(props) {
  const [datetime, setDatetime] = useState([]);

  useEffect(() => {
    MangaService.getUploadedDateTimeByChapterId(props.chapterid)
      .then((res) => {
        setDatetime(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  });

  return <>{datetime}</>;
}
