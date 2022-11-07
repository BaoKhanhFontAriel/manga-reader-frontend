import React, { useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../../../helper/history";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import UserService from "../../../services/user.service";
import { login } from "../../../slice/actions/auth";

export default function LoginPage(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    setError("")
    setState({ ...state, loading: true });
    dispatch(login(state.username, state.password))
      .then(() => {
        // let isAdmin = UserService.isAdmin();

        // if (isAdmin) {
        //   history.push("/admin");
        //   window.location.reload();
        // } else {
        history.push("/");
        window.location.reload();
        // }
      })
      .catch((e) => {
        setState({ ...state, loading: false });
        setError(e);
      });
  }

  function onUsernameChange(e) {
    setState({ ...state, username: e.target.value });
  }

  function onPasswordChange(e) {
    setState({ ...state, password: e.target.value });
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
            <div className="login-box border text-start ">
              <div
                className="login-form my-5"
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormItem
                    icon="mail"
                    name="username"
                    placeholder="Username hoặc Email"
                    registers={{
                      ...register("username", {
                        required: true,
                        onChange: (e) => onUsernameChange(e),
                      }),
                    }}
                  />
                  {errors.username && (
                    <div className="text-danger">
                      Vui lòng điền vào mục này.
                    </div>
                  )}
                  <FormItem
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    registers={{
                      ...register("password", {
                        required: true,
                        onChange: (e) => onPasswordChange(e),
                      }),
                    }}
                  />
                  {errors.password && (
                    <div className="text-danger">
                      Vui lòng điền vào mục này.
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
                  <SubmitButton name="ĐĂNG NHẬP" />
                </form>

                {error && (
                  <div className="form-group animate pop">
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>
                )}
                <div class="text-center">
                  <Link to="/forget-password">Quên mật khẩu</Link>
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
    <div class="login submit d-grid mt-4">
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
    <div class="username input-group input-group-lg mt-4">
      <span class="input-group-text" id="basic-addon1">
        <span class="material-symbols-outlined">{props.icon}</span>
      </span>
      <input
        type={props.type}
        name={props.name}
        class="form-control"
        placeholder={props.placeholder}
        {...props.registers}
      />
    </div>
  );
}
