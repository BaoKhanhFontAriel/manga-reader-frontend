import React, { Component, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import { WelcomeTagline, FormItem, SubmitButton } from "../login/LoginPage";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { history } from "../../../helper/history";
import { useForm } from "react-hook-form";
import { signup } from "../../../slice/actions/auth";

export default function SignUpPage(props) {
  const [state, setState] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    successful: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  function handleRegister() {
    setError("");

    setState({
      ...state,
      successful: false,
    });

    dispatch(
      signup(state.fullname, state.email, state.username, state.password)
    )
      .then(() => {
        setState({
          successful: true,
        });
        setShow(true);
      })
      .catch((e) => {
        setError(e);
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
                <form onSubmit={handleSubmit(handleRegister)}>
                  <FormItem
                    icon="person"
                    placeholder="Họ tên"
                    registers={{
                      ...register("fullname", {
                        required: true,
                        onChange: (e) => onChangeFullname(e),
                      }),
                    }}
                  />
                  {errors.fullname && (
                    <div className="text-danger text-start">
                      Vui lòng điền vào mục này.
                    </div>
                  )}
                  <FormItem
                    icon="mail"
                    placeholder="Email"
                    registers={{
                      ...register("email", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email không hợp lệ",
                        },
                        onChange: (e) => onChangeEmail(e),
                      }),
                    }}
                  />
                  {errors.email && (
                    <div className="text-danger text-start">
                      {errors.email.message}
                    </div>
                  )}
                  <FormItem
                    icon="person"
                    placeholder="Username"
                    registers={{
                      ...register("username", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        validate:{
                          isLenghtValidated: (value) => (value.length >= 5 & value.length <= 15) || "username phải dài từ 5 đến 15 ký tự",
                          isAllCharactersValidated: (value) => /^[a-zA-Z0-9._]+$/.test(value) || "username không chứa dấu cách, chỉ được chứa chữ số, chữ cái, \".\" hoặc  \"_\"",
                        },
                        onChange: (e) => onChangeUsername(e),
                      }),
                    }}
                  />
                  {errors.username && (
                    <div className="text-danger text-start">
                      {errors.username.message}
                    </div>
                  )}
                  <FormItem
                    icon="lock"
                    placeholder="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    registers={{
                      ...register("password", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        onChange: (e) => onChangePassword(e),
                      }),
                    }}
                  />
                  {errors.password && (
                    <div className="text-danger text-start">
                      {errors.password.message}
                    </div>
                  )}
                  <FormItem
                    icon="lock_reset"
                    placeholder="Nhập lại mật khẩu"
                    type={showPassword ? "text" : "password"}
                    registers={{
                      ...register("check_password", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        validate: (v) =>
                          state.password === v || "Mật khẩu gõ lại không khớp!",
                      }),
                    }}
                  />

                  {errors.check_password && (
                    <div className="text-danger text-start">
                      {errors.check_password.message}
                    </div>
                  )}

                  <div className="show-password fs-5 mt-3 d-flex justify-content-start">
                    <input
                      type="checkbox"
                      id="show-password"
                      className="me-2"
                      style={{ transform: "scale(1.3)" }}
                      onClick={() => setShowPassword(!showPassword)}
                    ></input>
                    <label for="show-password">Hiện mật khẩu</label>
                  </div>

                  <SubmitButton name="ĐĂNG KÝ" />
                </form>
                {error && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {error}
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
      <div className="alert alert-success p-3 rounded">
        <div className="mb-2">Bạn đã đăng ký thành công!</div>
        <div className="mb-4"> Xin hãy đăng nhập lại!</div>
        <button className="btn btn-primary" type="button" onClick={handleClick}>
          Đóng
        </button>
      </div>
    </div>
  );
}
