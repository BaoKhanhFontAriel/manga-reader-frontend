import React, { Component, useEffect, useState } from "react";
import Header from "../../common/Header";
import Navigation from "../../common/Navigation";
import Footer from "../../common/Footer";
import RankingSidebar from "../../common/RankingSidebar";
import userService from "../../../services/user.service";
import { MainContentTitle } from "../../home/HomePage";
import MangaItem from "../../home/MangaItem";
import Pagination from "../../home/Pagination";
import { connect } from "react-redux";
import FavoriteButton from "../../manga/FavoriteButton";

export class FavoritePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <main class="my-4" style={{ minHeight: "800px" }}>
          <div class="container">
            <div class="row">
              <div class="col-9">
                <MainContent user={this.props.user} />
              </div>
              <div class="col-3">
                <RankingSidebar />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

function MainContent(props) {
  const [mangas, setMangas] = useState([]);
  const userId = props.user.id;
  const increFavorite = () => {};
  const decreFavorite = () => {};

  useEffect(() => {
    userService
      .getFavoriteManga(userId)
      .then((response) => {
        setMangas(response.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }, []);

  return (
    <section class="main-content">
      <MainContentTitle title="Danh Sách Theo Dõi" />
      <div class="manga-grid me-4 mb-5">
        <div class="row ">
          {mangas.map((manga) => (
            <div className="col-3 d-flex flex-column align-items-center ">
              <MangaItem manga={manga} />
              <FavoriteButton
                mangaId={manga.id}
                increFavorite={increFavorite}
                decreFavorite={decreFavorite}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div class="">
        <Pagination totalPages={mangas.length} />
      </div> */}
    </section>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(FavoritePage);
