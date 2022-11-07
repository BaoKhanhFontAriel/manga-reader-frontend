import React, { Component } from "react";
import UltraBigTitle from "../../chapter/UltraBigTitle";
import Footer from "../../common/Footer";
import { Header } from "../../common/Header";
import { SubmitButton } from "../login/LoginPage";
import { FormItem } from "../login/LoginPage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UserListService from "../../../services/UserListService";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import UserService from "../../../services/user.service";
export default function ChangePassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  function onSubmit() {
    setMessage("");
    setError("");
    UserListService.changePasswordFromUserId(userid, newPassword)
      .then(
        (res) => {
          setMessage("Đổi mật khẩu thành công! Vui lòng đăng nhập lại!");
        },
        (error) => {
          setError("Đổi mật khẩu thất bại! Lỗi: " + error);
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <Header />
      <div class="container mt-5" style={{ height: "500px" }}>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <UltraBigTitle object="Cài đặt lại mật khẩu" />
            <div className="send-email-box border text-start ">
              <div
                className="login-form my-5"
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormItem
                    icon="lock"
                    placeholder="Mật khẩu mới"
                    type={showPassword ? "text" : "password"}
                    registers={{
                      ...register("password", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        onChange: (e) => setNewPassword(e.target.value),
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
                    placeholder="Nhập lại mật khẩu mới"
                    type={showPassword ? "text" : "password"}
                    registers={{
                      ...register("check_password", {
                        required: {
                          value: true,
                          message: "Vui lòng điền vào mục này.",
                        },
                        validate: (v) =>
                          newPassword === v || "Mật khẩu không khớp!",
                      }),
                    }}
                  />

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

                  {errors.check_password && (
                    <div className="text-danger text-start">
                      {errors.check_password.message}
                    </div>
                  )}

                  <SubmitButton name="CẬP NHẬT" />
                </form>
                {message && (
                  <div className="form-group animate pop">
                    <div
                      className="alert alert-success text-center"
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                {error && (
                  <div className="form-group animate pop">
                    <div
                      className="alert alert-danger text-center"
                      role="alert"
                    >
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
    </div>
  );
}
