import Header from "../../common/Header";
import Navigation from "../../common/Navigation";
import Footer from "../../common/Footer";
import React, { Component, useState } from "react";
import ProfileSetting from "./ProfileSetting";
import PasswordSetting from "./PasswordSetting";

export default class SettingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <div
          className="pages-main mt-5 mb-5 fs-6"
          style={{ height: "580px" }}
        >
          <div class="container">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <MainContent />
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function MainContent(props) {
  const [activeSetting, setAcctiveSetting] = useState("profile");

  const handlePasswordClick = () => {
    setAcctiveSetting("password");
  };

  const handleProfileClick = () => {
    setAcctiveSetting("profile");
  };

  return (
    <div className="user-setting">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class={activeSetting == "profile" ? "nav-link active" : "nav-link"}
            onClick={handleProfileClick}
            style={{
              color:
                activeSetting == "profile" ? "var(--red-lipstick)" : "grey",
              backgroundColor: activeSetting !== "profile" ? "WhiteSmoke" : "",
            }}
          >
            Cài Đặt Hồ sơ
          </button>
          <button
            class={activeSetting == "password" ? "nav-link active" : "nav-link"}
            onClick={handlePasswordClick}
            style={{
              color:
                activeSetting == "password" ? "var(--red-lipstick)" : "grey",
              backgroundColor: activeSetting !== "password" ? "WhiteSmoke" : "",
            }}
          >
            Cài Đặt Mật khẩu
          </button>
        </div>
      </nav>
      <div
        class="tab-content border  border-top-0 p-5 "
        // style={{ paddingLeft: "140px", paddingRight: "140px" }}
      >
        <div
          class={
            activeSetting == "profile"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
        >
          <ProfileSetting />
        </div>
        <div
          class={
            activeSetting == "password"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
        >
          <PasswordSetting />
        </div>
      </div>
    </div>
  );
}
