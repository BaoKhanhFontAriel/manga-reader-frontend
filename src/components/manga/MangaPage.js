import RankingSidebar from "../common/RankingSidebar";
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import { connect } from "react-redux";
import MainContent from "./MainContent";
import { Outlet } from "react-router-dom";
export function MangaPage(props) {
  return (
    <div>
      <Header />
      <Navigation/>
      <main class="my-4" style={{ minHeight: "800px" }} >
        <div class="container">
          <div class="row">
            <div class="col-9">
              <MainContent />
            </div>
            <div class="col-3">
              <RankingSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Outlet />
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(MangaPage);
