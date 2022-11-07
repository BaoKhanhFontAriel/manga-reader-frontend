import { useState, useEffect } from "react";
import MangaService from "../../services/manga.service";
import { useForm } from "react-hook-form";
import { history } from "../../helper/history";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const SELECTED = "check_box";
const BLANK = "check_box_outline_blank";
const UNSELECTED = "indeterminate_check_box";

export default function SearchForm(props) {
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");
  const [genreStatuses, setGenreStatuses] = useState([]);
  const init = props.init;
  const [keywords, setKeywords] = useState(init.keywords);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log(init);
  // set default value in seacrh input
  // reset({keywords: init.keywords})

  useEffect(() => {
    MangaService.getAllGenres()
      .then((res) => {
        setGenres(res.data);

        // assign status for each genre
        // the index of genreStatuses reflects the index of genre list
        let genres = res.data;
        let genreStatuses = [];
        for (let i = 0; i < genres.length; i++) {
          if (init.selectedGenres.includes(genres[i])) {
            genreStatuses.push({
              clickCount: 1,
              status: SELECTED,
            });
          } else if (init.unSelectedGenres.includes(genres[i])) {
            genreStatuses.push({
              clickCount: 2,
              status: UNSELECTED,
            });
          } else {
            genreStatuses.push({
              clickCount: 0,
              status: BLANK,
            });
          }
        }
        setGenreStatuses(genreStatuses);
        reset({ keywords: init.keywords });
      })
      .catch((e) => {
        setMessage(e.message);
      });
  }, []);

  function handleClick(index) {
    // get the current selected genre checkbox
    let i = "genre" + index;
    const selected = document.getElementById(i);
    const icon = selected.querySelector(".icon");

    // get the current selected genre status
    let genreStatus = genreStatuses[index];

    // count click to set genre icon
    if (genreStatus.clickCount === 2) {
      genreStatus.clickCount = 0;
    } else {
      genreStatus.clickCount++;
    }

    // change checkbox icon and current genre status
    switch (genreStatus.clickCount) {
      case 1:
        icon.textContent = SELECTED;
        genreStatus.status = SELECTED;
        break;
      case 2:
        icon.textContent = UNSELECTED;
        genreStatus.status = UNSELECTED;
        break;
      default:
        icon.textContent = BLANK;
        genreStatus.status = BLANK;
        break;
    }
  }

  function handleReset() {
    console.log("reset ");
    history.push("/search");
    window.location.reload();
  }

  const onSubmit = (data) => {
    // if the current genre is being selected, add it to the  string of selected genre
    // if the current genre is being unselected, add it to the string of unselected genre
    let selectedGenres = "";
    let unselectedGenres = "";

    genres.forEach((genre, index) => {
      if (genreStatuses[index].status === SELECTED) {
        selectedGenres += genre + " ";
      } else if (genreStatuses[index].status === UNSELECTED) {
        unselectedGenres += genre + " ";
      }
    });

    props.search(keywords, selectedGenres, unselectedGenres);
  };

  return (
    <div
      className="search-form pb-3"
      style={{ borderBottom: "solid 1px var(--orange-dark)" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="search-box position-relative  mb-5">
          <div className="row g-0">
            <div className="col-3"></div>
            <div className="col-6 position-relative" style={{ width: "50%" }}>
              <input
                type="text"
                class="form-control"
                placeholder="Gõ truyện bạn muốn tìm"
                style={{ fontSize: "16px", zIndex: "0" }}
                {...register("keywords", {
                  onChange: (e) => setKeywords(e.target.value),
                })}
              ></input>
              <button
                className="btn btn-primary rounded-end d-flex align-items-center position-absolute top-0 end-0"
                type="submit"
                style={{ fontSize: "16px", zIndex: "0" }}
              >
                <span class="material-symbols-outlined">search</span>
              </button>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="icon-notes mb-4 position-relative">
          <div className="icon-note d-flex align-items-center text-success">
            <span class="icon material-symbols-outlined">{SELECTED}</span>
            <span> = Tìm những truyện trong thể loại này</span>
          </div>
          <div className="icon-note d-flex align-items-center text-danger">
            <span class="icon material-symbols-outlined">{UNSELECTED}</span>
            <span> = Loại trừ những thể loại này</span>
          </div>
          <div className="icon-note d-flex align-items-center text-warning">
            <span class="icon material-symbols-outlined">{BLANK}</span>
            <span> = Truyện có thể thuộc hoặc không thuộc thể loại này</span>
          </div>
          <button
            className="reset-button btn btn-warning position-absolute bottom-0 end-0 d-flex align-items-center"
            type="button"
            onClick={() => {
              handleReset();
            }}
          >
            <span class="material-symbols-outlined">restart_alt</span>Reset
          </button>
        </div>
        <div
          className="category-checkbox input-group "
          style={{ fontSize: "18px" }}
        >
          <div className="row ">
            <div className="col-2 text-start">
              <span className="fw-bolder ">Thể loại</span>
            </div>
            <div className="col-10">
              <div className="row">
                {genres.map((genre, index) => (
                  <div
                    className="col-3 d-flex justify-content-start align-items-center"
                    id={"genre" + index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(index)}
                  >
                    <span class="icon material-symbols-outlined">
                      {genreStatuses[index].status}
                    </span>
                    <span className="ms-2" id={genre}>
                      {genre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
