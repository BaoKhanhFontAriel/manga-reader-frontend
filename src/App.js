import "./App.css";
import HomePage from "./components/home/HomePage";
import MangaPage from "./components/manga/MangaPage";
import { Routes as Switch, Route } from "react-router-dom";
import ChapterPage from "./components/chapter/ChapterPage";
import LoginPage from "./components/user/login/LoginPage";
import SignUpPage from "./components/user/signup/SignUpPage";
import FavoritePage from "./components/user/favorite/FavoritePage";
import UploadChapter from "./components/chapter/UploadChapter";
import GenrePage from "./components/genre/GenrePage";
import Dashboard from "./components/user/dashboard/Dashboard";
import ChapterDetail from "./components/user/dashboard/ChapterDetail";
import ChapterEditor from "./components/user/dashboard/ChapterEditor";
import SearchPage from "./components/search/SearchPage";
import SettingPage from "./components/user/setting/SettingPage";
import AdminPage from "./components/admin/AdminPage";
import ForgetPassword from "./components/user/forget-passsword/ForgetPassword";
import ChangePassword from "./components/user/forget-passsword/ChangePassword";
import { Header } from "./components/common/Header";
import { Navigation } from "./components/common/Navigation";
import Notification from "./components/common/notification/Notification";

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/" element={<HomePage />}>
          <Route path="home"></Route>
        </Route>
        <Route path="mangas">
          <Route path=":mangaid">
            <Route path="upload-chapter" element={<UploadChapter />}></Route>
            <Route path="chapters/:chapterid" element={<ChapterPage />}></Route>
            <Route index element={<MangaPage />}></Route>
          </Route>
        </Route>
        <Route path="genres">
          <Route path=":genre">
            <Route path=":sortBy" element={<GenrePage />}></Route>
          </Route>
          <Route index path=":sortBy" element={<GenrePage />}></Route>
        </Route>

        {/* <Route path="mangas/:mangaid">
          <Route path="upload-chapter" element={<UploadChapter />}></Route>
          <Route path="chapters/:chapterid" element={<ChapterPage />}></Route>
        </Route> */}
        <Route path="user">
          <Route path="favorites" element={<FavoritePage />}></Route>
          <Route path="dashboard">
            <Route path="chapters/:chapterid">
              <Route path="detail" element={<ChapterDetail />}></Route>
              <Route path="edit" element={<ChapterEditor />}></Route>
            </Route>
            <Route index element={<Dashboard />}></Route>
          </Route>
          <Route path="setting" element={<SettingPage />}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="signup" element={<SignUpPage />}></Route>
        <Route path="search">
          <Route path="result" element={<SearchPage />}></Route>
          <Route index element={<SearchPage />}></Route>
        </Route>
        <Route path="admin" element={<AdminPage />}></Route>
        <Route path="forget-password" element={<ForgetPassword />}></Route>
        <Route path="change-password" element={<ChangePassword />}></Route>
      </Switch>
      <Notification text="them vao asaf"></Notification>
    </div>
  );
}

export default App;
