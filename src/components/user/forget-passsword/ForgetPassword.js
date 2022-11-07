import React, { Component } from "react";
import UltraBigTitle from "../../chapter/UltraBigTitle";
import Footer from "../../common/Footer";
import { Header } from "../../common/Header";
import { SubmitButton } from "../login/LoginPage";
import { FormItem } from "../login/LoginPage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UserListService from "../../../services/UserListService";
import { Link } from "react-router-dom";
import EmailService from "../../../services/EmailService";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";

export default function ForgetPassword(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit() {
    setError("");
    setMessage("");
    setIsLoading(true);
    UserListService.findUserByEmail(email).then(
      (res) => {
        EmailService.sendEmailForChangingPassword(email)
          .then(
            (res) => {
              console.log("mail sent!");
              setIsLoading(false);
              setMessage("Email đã được gửi vào hòm thư!");
            },
            (error) => {
              setError("Gửi Email thất bại!");
            }
          )
          .catch((e) => {
            console.log(e);
          });
      },
      (error) => {
        setError("not_existed");
        setIsLoading(false);
      }
    );
  }

  return (
    <div>
      <Header />
      <div class="container mt-5" style={{ height: "500px" }}>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <UltraBigTitle object="Nhập email lấy lại mật khẩu" />
            <div className="send-email-box border text-start">
              <div
                className="login-form my-5  "
                style={{ marginLeft: "100px", marginRight: "100px" }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormItem
                    icon="mail"
                    name="email"
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
                        onChange: (e) => setEmail(e.target.value),
                      }),
                    }}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email.message}</div>
                  )}

                  <SubmitButton name="GỬI LINK ĐĂNG NHẬP" />
                </form>

                {error && (
                  <div className="form-group animate pop">
                    <div
                      className="alert alert-danger text-center"
                      role="alert"
                    >
                      {error === "not_existed" ? (
                        <div>
                          Tài khoản không tồn tại. Vui lòng
                          <Link to="/signup" className="mx-1">
                            đăng ký
                          </Link>
                          tài khoản mới
                        </div>
                      ) : (
                        <div> Gửi Email thất bại!</div>
                      )}
                    </div>
                  </div>
                )}

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

                {isLoading && (
                  <div className="loading d-flex flex-column align-items-center">
                    <ReactLoading
                      type="balls"
                      color="var(--blue-dark)"
                      width={30}
                      height={30}
                    />
                    <div>Chờ chút xíu bạn nha :,)</div>
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
