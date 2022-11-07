import UltraBigTitle from "../../chapter/UltraBigTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserService from "../../../services/user.service";
import { connect } from "react-redux";

export function PasswordSetting(props) {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isEnable, setIsEnable] = useState(false);

  function onSubmit() {
    UserService.changePassword(newPassword)
      .then(
        (res) => {
          setMessage(res.data);
        },
        (error) => {
          setMessage(error.response.data);
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {/* <UltraBigTitle object="Thay đổi mật khẩu" /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="chapterForm"
        className="chapter-form "
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="row align-items-center text-start">
          <div class="col-4">
            <label for="number" class="col-form-label">
              Mật khẩu cũ
            </label>
          </div>
          <div class="col-8">
            <input
              type="password"
              class="form-control"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Vui lòng điền vào phần này!",
                },
                validate: async (v) =>
                  (await (await UserService.isPasswordMatch(v)).data) ||
                  "Mật khẩu không khớp!",
                onChange: (e) => {
                  setIsEnable(true);
                },
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-4"></div>
          <div className="col-auto">
            {errors.oldPassword && (
              <div className="text-danger text-start">
                {errors.oldPassword.message}
              </div>
            )}
          </div>
        </div>
        <div class="row align-items-center text-start">
          <div class="col-4">
            <label for="number" class="col-form-label">
              Mật khẩu mới
            </label>
          </div>
          <div class="col-8">
            <input
              type="password"
              class="form-control"
              {...register("newpassword", {
                required: "Vui lòng điền vào phần này!",
                onChange: (e) => {
                  setNewPassword(e.target.value);
                  setIsEnable(true);
                },
                // value: fullname,
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-4"></div>
          <div className="col-auto">
            {errors.newpassword && (
              <div className="text-danger text-start">
                {errors.newpassword.message}
              </div>
            )}
          </div>
        </div>
        <div class="row align-items-center text-start">
          <div class="col-4">
            <label for="number" class="col-form-label">
              Gõ lại mật khẩu mới
            </label>
          </div>
          <div class="col-8">
            <input
              type="password"
              class="form-control"
              {...register("retypePassword", {
                required: true,
                validate: (v) => v === newPassword || "Mật khẩu không khớp!",
                onChange: (e) => {
                  //   setFullname(e.target.value);
                  setIsEnable(true);
                },
                // value: fullname,
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-4"></div>
          <div className="col-auto">
            {errors.retypePassword && (
              <div className="text-danger text-start">
                {errors.retypePassword.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          {isEnable ? (
            <button className="btn btn-primary">Cập nhật</button>
          ) : (
            <button className="btn btn-primary" disabled>
              Cập nhật
            </button>
          )}
        </div>
        {/* <input type="submit">Cập nhật</input> */}
      </form>
      {message && (
        <div className="animate pop p-3 bg-info bg-opacity-10 border border-info rounded">
          {message}
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;

  return { user };
}

export default connect(mapStateToProps)(PasswordSetting);
