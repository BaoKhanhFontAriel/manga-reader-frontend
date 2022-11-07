import React, { Component, useState, useEffect, useRef } from "react";
import icon from "../../image/onepunchman-cut.png";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { history } from "../../helper/history";
import MangaService from "../../services/manga.service";
import ReactLoading from "react-loading";
import userIcon from "../../image/user.png";
import UserService from "../../services/user.service";
import SearchService from "../../services/SearchService";
import SearchBar from "./SearchBar";
import { logout } from "../../slice/actions/auth";

export function Header(props) {
  const headerStyle = {
    backgroundColor: "var(--orange-dark)",
  };

  return (
    <header style={headerStyle}>
      <div class="container">
        <div
          class="row d-flex align-items-center"
          style={{ paddingLeft: "0px" }}
        >
          <div class="col-4">
            <WebLogo />
          </div>
          <div class="col-4">
            <SearchBar />
          </div>
          <div class="col-4 d-flex justify-content-end ">
            {!props.isLoggedIn && <UserLogout />}
            {props.isLoggedIn && <UserLogin currentUser={props.user} />}
          </div>
        </div>
      </div>
    </header>
  );
}


function UserLogin(props) {
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    UserService.getUserDetail(props.currentUser.id)
      .then((res) => {
        setAvatar(res.data.avatar);
        setUsername(res.data.username);
      })
      .catch(function (ex) {
        console.log(ex);
      });
  }, []);

  return (
    <div className="d-flex align-items-center  g-0">
      <div>
        <span className="me-1">
          Xin chào,
          <span
            className="ms-2"
            style={{ color: "var(--red-lipstick)", fontWeight: "bolder" }}
          >
            {username}
          </span>
          !
        </span>
      </div>

      <div className="position-relative p-2">
        <span
          style={{
            cursor: "pointer",
          }}
          class="material-symbols-outlined rounded-circle"
          onClick={() => setShow(!show)}
        >
          <img
            src={avatar === null ? userIcon : avatar}
            width={36}
            className="rounded-circle"
          ></img>
        </span>
        {show && <UserMenu />}
      </div>
    </div>
  );
}

function UserMenu() {
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    window.location.reload();
  }

  return (
    <div
      className="position-absolute rounded py-2 px-3 shadow text-start"
      style={{
        background: "white",
        width: "120px",
        right: "0",
        top: "100%",
        zIndex: "2",
      }}
    >
      <Link to="/user/setting">
        <div className="mb-2 ">Cài đặt</div>
      </Link>
      <Link to="/" onClick={handleLogout}>
        <div>Đăng xuất</div>
      </Link>
    </div>
  );
}

function UserLogout() {
  return (
    <div className="logout">
      <Link to="/login">Đăng Nhập</Link> <span class="ms-2 me-2">|</span>{" "}
      <Link to="/signup">Đăng Ký</Link>
    </div>
  );
}

export function WebLogo() {
  const webIconStyle = {
    color: "black",
    fontSize: "36px",
  };

  return (
    <div class="web-icon">
      <Link to="/">
        <span style={webIconStyle} class="rubik-dirt-font">
          MangaPunch
        </span>
        <span>
          <img src={icon} alt="onepunch-icon" style={{ width: "78px" }}></img>
        </span>
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Header);
