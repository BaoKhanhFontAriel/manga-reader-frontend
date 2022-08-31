import React, { Component, useState } from "react";
import icon from "../../image/onepunchman-cut.png";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { logout } from "../../actions/auth";
import { history } from "../../helper/history";
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
          <div class="col-5">
            <div class="search-box position-relative ">
              <input
                type="text"
                class="form-control"
                placeholder="Bạn muốn tìm truyện gì"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>

              <span
                class="material-symbols-outlined position-absolute top-0 end-0 mt-2 me-2"
                id="basic-addon1"
              >
                search
              </span>
            </div>
          </div>
          <div class="col-3 d-flex justify-content-end ">
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
  return (
    <div className="d-flex align-items-center  g-0">
      <div>
        <span className="me-2">
          Xin chào,
          <span
            className="ms-2"
            style={{ color: "var(--red-lipstick)", fontWeight: "bolder" }}
          >
            {props.currentUser.username}
          </span>
          !
        </span>
      </div>

      <div className="position-relative p-2">
        <span
          style={{
            background: "var(--red-lipstick)",
            cursor: "pointer",
            scale: "1.6",
          }}
          class="material-symbols-outlined rounded-circle "
          onClick={() => setShow(!show)}
        >
          account_circle
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
        zIndex: "1",
      }}
    >
      <div className="mb-2 ">
        <Link to="/user/setting">Hồ sơ</Link>
      </div>
      <div>
        <Link to="/" onClick={handleLogout}>
          Đăng xuất
        </Link>
      </div>
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
  const { isLoggedIn,user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Header);
