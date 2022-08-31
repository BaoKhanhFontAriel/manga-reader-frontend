import React from "react";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { connect } from "react-redux";
import { useParams } from "react-router";
export function FavoriteButton(props) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { mangaid } = useParams();

  useEffect(() => {
    userService
      .isMangaFavoritedByUser(mangaid, props.user.username)
      .then((res) => {
        setIsFavorited(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  function handleAddToFavorite() {
    setIsFavorited(true);
    props.increFavorite();

    userService
      .addMangaToFavorite(mangaid, props.user.username)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  function handleCancelFavorite() {
    setIsFavorited(false);
    props.decreFavorite();
    userService
      .removeMangaFromFavorite(mangaid, props.user.username)
      .then((res) => {
        console.log(res.data);
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
          onClick={handleCancelFavorite}
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
