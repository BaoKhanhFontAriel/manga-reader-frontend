import React, { Component, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import { history } from "../../../helper/history";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export function LoginPage(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
  });

  const dispatch = useDispatch();

  function onUsernameChange(e) {
    setState({ ...state, username: e.target.value });
  }

  function onPasswordChange(e) {
    setState({ ...state, password: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    setState({ ...state, loading: true });
    dispatch(login(state.username, state.password))
      .then((response) => {
        history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setState({ ...state, loading: false });
      });
  }

  if (props.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Header></Header>
      <div class="container my-5">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <WelcomeTagline />
            <div className="not-a-memeber mb-2 d-flex justify-content-end align-items-center">
              <span>Không phải thành viên? </span>
              <span class="btn btn-info ms-2">
                <Link to="/signup">Đăng ký</Link>
              </span>
            </div>
            <div className="login-box border">
              <div
                className="login-form my-5"
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                <form onSubmit={handleLogin}>
                  <FormItem
                    icon="mail"
                    name="username"
                    placeholder="Username"
                    value={state.username}
                    onChange={(e) => onUsernameChange(e)}
                  />
                  <FormItem
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={(e) => onPasswordChange(e)}
                  />
                  <SubmitButton name = "ĐĂNG NHẬP"/>
                </form>
                {props.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {props.message}
                    </div>
                  </div>
                )}
                <div class="">
                  <Link to="">Quên mật khẩu</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function SubmitButton(props) {
  return (
    <div class="login submit d-grid">
      <button
        className="btn btn-primary rounded p-2 mb-3"
        type="sumbmit"
        style={{
          background: "var(--blue-dark)",
          width: "100%",
        }}
      >
        {props.name}
      </button>
    </div>
  );
}

function ErrorMessage(props) {
  return <div class="danger">{props.message}</div>;
}

export function WelcomeTagline() {
  return (
    <div className="welcome mb-5">
      <div class="fs-1 mb-3" style={{ color: "var(--red-lipstick)" }}>
        Chào mừng đến với MangaPunch!{" "}
      </div>
      <div class="fs-5">
        Đọc truyện miễn phí và vô tư trao đổi cùng các Mọt Truyện{" "}
      </div>
    </div>
  );
}

export function FormItem(props) {
  return (
    <div class="username input-group input-group-lg mb-3">
      <span class="input-group-text" id="basic-addon1">
        <span class="material-symbols-outlined">{props.icon}</span>
      </span>
      <input
        type="text"
        name={props.name}
        class="form-control"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  console.log("LoginPage connect successful");

  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(LoginPage);

