import "./App.css";
import HomePage from "./components/home/HomePage";
import MangaPage from "./components/manga/MangaPage";
import { Routes as Switch, Route } from "react-router-dom";
import ChapterPage from "./components/chapter/ChapterPage";
import LoginPage from "./components/user/login/LoginPage";
import SignUpPage from "./components/user/signup/SignUpPage";
import FavoritePage from "./components/user/favorite/FavoritePage";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="mangas">
          <Route path=":mangaid" element={<MangaPage />}></Route>
          {/* <Route path=":genre" element={<MangaPage />}></Route> */}
        </Route>
        <Route path="mangas">
          <Route path=":mangaid" element = {<MangaPage/>}>
            <Route path="chapters">
              <Route path=":chapterid" element={<ChapterPage />}></Route>
            </Route>
          </Route>
          {/* <Route path=":genre" element={<MangaPage />}></Route> */}
        </Route>
        <Route path="user">
            <Route path="favorites" element={<FavoritePage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Switch>
    </div>
  );
}

export default App;
