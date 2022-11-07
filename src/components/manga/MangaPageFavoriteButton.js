import FavoriteButton from "./FavoriteButton";
import { connect } from "react-redux";
import { useEffect } from "react";
import MangaService from "../../services/manga.service";
import { useState } from "react";
import { useParams } from "react-router";

export function MangaPageFavoriteButton(props) {
  const [favorites, setFavorites] = useState(0);
  const { mangaid } = useParams();
  const increFavorite = () => {
    setFavorites(favorites + 1);
  };
  const decreFavorite = () => {
    setFavorites(favorites - 1);
  };

  useEffect(() => {
    MangaService.getFavoriteNumberByMangaId(mangaid)
      .then((res) => {
        setFavorites(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <div>
      {!props.isLoggedIn && (
        <div className="fst-italic fw-light mb-2">
          Hãy đăng nhập để theo dõi truyện
        </div>
      )}
      <div className="d-flex align-items-center">
        <FavoriteButton
          mangaId={mangaid}
          increFavorite={increFavorite}
          decreFavorite={decreFavorite}
        />
        <div>
          <span className="fw-bold">{favorites}</span> Người đã theo dõi truyện
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(MangaPageFavoriteButton);
