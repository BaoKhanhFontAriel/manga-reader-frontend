import React, { Component, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import { WelcomeTagline, FormItem, SubmitButton } from "../login/LoginPage";
import { useDispatch } from "react-redux";
import { register } from "../../../actions/auth";
import { connect } from "react-redux";
import { history } from "../../../helper/history";
export function SignUpPage(props) {
  const [state, setState] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    successful: false,
  });

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  function onChangeFullname(e) {
    setState({ ...state, fullname: e.target.value });
  }

  function onChangeUsername(e) {
    setState({ ...state, username: e.target.value });
  }
  function onChangeEmail(e) {
    setState({
      ...state,
      email: e.target.value,
    });
  }
  function onChangePassword(e) {
    setState({
      ...state,
      password: e.target.value,
    });
  }
  function handleRegister(e) {
    e.preventDefault();
    setState({
      ...state,
      successful: false,
    });

    dispatch(
      register(state.fullname, state.email, state.username, state.password)
    )
      .then(() => {
        setState({
          successful: true,
        });
        setShow(true);
      })
      .catch(() => {
        setState({
          successful: false,
        });
      });
  }

  return (
    <div className="position-relative">
      <Header />
      <div class="container my-5">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <WelcomeTagline />
            <div className="not-a-memeber mb-2 d-flex justify-content-end align-items-center">
              <span>Tôi là thành viên? </span>
              <span class="btn btn-info ms-2">
                <Link to="/login">Đăng nhập</Link>
              </span>
            </div>
            <div className="login-box border">
              <div
                className="login-form my-5"
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                <form onSubmit={handleRegister}>
                  <FormItem
                    icon="person"
                    placeholder="Fullname"
                    value={state.fullname}
                    onChange={(e) => onChangeFullname(e)}
                  />
                  <FormItem
                    icon="mail"
                    placeholder="Email"
                    value={state.email}
                    onChange={(e) => onChangeEmail(e)}
                  />
                  <FormItem
                    icon="person"
                    placeholder="Username"
                    value={state.username}
                    onChange={(e) => onChangeUsername(e)}
                  />
                  <FormItem
                    icon="lock"
                    placeholder="Password"
                    value={state.password}
                    onChange={(e) => onChangePassword(e)}
                  />
                  <SubmitButton name="ĐĂNG KÝ" />
                </form>
                {props.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {props.message}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <Footer />
      {show && <SuccessfulSignupPopup />}
    </div>
  );
}

function SuccessfulSignupPopup() {
  function handleClick() {
    history.push("/login");
    window.location.reload();
  }

  return (
    <div
      className="position-absolute "
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        top: "40%",
        right: "0",
        left: "0",
        textAlign: "center",
        width: "400px",
        fontSize: "18px",
      }}
    >
      <div className="bg-warning p-3 rounded">
        <div className="mb-2">Bạn đã đăng ký thành công!</div>
        <div className="mb-2"> Xin hãy đăng nhập lại!</div>
        <button className="btn btn-primary" type="button" onClick={handleClick}>
          Đóng
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(SignUpPage);
