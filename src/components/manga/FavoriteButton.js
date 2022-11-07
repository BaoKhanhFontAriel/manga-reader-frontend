import React from "react";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { connect, useDispatch } from "react-redux";
import { setNotification } from "../../slice/actions/notification";

export function FavoriteButton(props) {
  const [isFavorited, setIsFavorited] = useState(false);
  const mangaId = props.mangaId
  const user = props.user
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.isLoggedIn) {
      userService
        .isMangaFavoritedByUser(mangaId, user.id)
        .then((res) => {
          setIsFavorited(res.data);
        })
        .catch(function (ex) {
          console.log("Response parsing failed. Error: ", ex);
        });
    }
  }, []);

  function handleAddToFavorite() {
    setIsFavorited(true);
    props.increFavorite();

    userService
      .addMangaToFavorite(mangaId, user.username)
      .then(()=>{
          dispatch(setNotification("Đã thêm vào mục thẽo dõi!"))
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  function handleRemoveFromFavorite() {
    setIsFavorited(false);
    props.decreFavorite();
    userService
      .removeMangaFromFavorite(mangaId, user.username)
      .then((res) => {
        dispatch(setNotification("Đã bỏ khỏi mục thẽo dõi!"))
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  return (
    <div>
      {!isFavorited && (
        <button
          type="button"
          class="btn btn-primary d-flex align-items-center me-2"
          disabled={!props.isLoggedIn}
          onClick={handleAddToFavorite}
        >
          <span class="material-symbols-outlined me-2">favorite</span>
          <span>Theo dõi</span>
        </button>
      )}

      {/*  user favorited manga, show "cancel favorite" button */}
      {isFavorited && (
        <button
          type="button"
          class="btn btn-danger d-flex align-items-center me-2"
          onClick={handleRemoveFromFavorite}
        >
          <span class="material-symbols-outlined me-2">close</span>
          <span>Bỏ Theo dõi</span>
        </button>
      )}

    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(FavoriteButton);
