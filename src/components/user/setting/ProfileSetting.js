import UltraBigTitle from "../../chapter/UltraBigTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import UserService from "../../../services/user.service";
import userIcon from "../../../image/user.png";

function ProfileSettings(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isEnable, setIsEnable] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [defaultAvatar, setDefaultAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onImageChange = (event) => {
    let file = event.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    setImageData(imageData);
    setImagePreview(URL.createObjectURL(file));
    setIsEnable(true);
  };

  useEffect(() => {
    UserService.getUserDetail().then(
      (res) => {
        setDefaultAvatar(res.data.avatar);
        setImagePreview(res.data.avatar);

        let defaultValues = {
          fullname: res.data.name,
          email: res.data.email,
          username: res.data.username,
          avatar: res.data.avatar,
        };
        reset({ ...defaultValues });
      },
      (error) => {
        setMessage(error);
      }
    );
  }, []);

  const onCancleChange = (e) => {
    e.preventDefault();
    reset();
    setIsEnable(false);
    setImageData(null);
    setImagePreview(defaultAvatar);
    setMessage(null);
  };

  function onSubmit() {
    setMessage(null);
    if (imageData !== null) {
      UserService.uploadImage(imageData)
        .then((res) => {
          // setMessage("Cập nhật avatar thành công!");
        })
        .catch(function (ex) {
          setMessage("Cập nhật avatar không thành công!");
        });
    }

    UserService.editUserDetail({
      fullname,
      email,
      username,
    })
      .then((res) => {
        // setMessage("Cập nhật thành công!");
        window.location.reload();
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  }

  return (
    <div>
      {/* <UltraBigTitle object="Hồ sơ cá nhân" /> */}

      <div className="user-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="chapterForm"
          className="chapter-form"
          method="POST"
          enctype="multipart/form-data"
        >
          <div class="icon-input row g-3 align-items-center text-start mb-3">
            <div class="col-3">
              <label for="number" class="col-form-label">
                Avatar
              </label>
            </div>
            <div class="col-3 position-relative ">
              <img
                src={imagePreview === null ? userIcon : imagePreview}
                width="100%"
                className="rounded-circle"
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
              ></img>
            </div>
            <div className="col-4">
              <input
                accept="image/*"
                className="image-input"
                id="upload-profile-image"
                type="file"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
              <label
                htmlFor="upload-profile-image"
                className="change-avatar-button border rounded d-flex align-items-center justify-content-center p-1 bg-light"
                style={{ cursor: "pointer" }}
              >
                <span class="material-symbols-outlined">file_upload</span>
                <span>Thay avatar</span>
              </label>
            </div>
          </div>
          <div class="row g-3 align-items-center text-start">
            <div class="col-3">
              <label for="number" class="col-form-label">
                Họ tên
              </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                id="number"
                class="form-control"
                aria-describedby="number"
                // value={fullname}
                {...register("fullname", {
                  required: true,
                  onChange: (e) => {
                    setFullname(e.target.value);
                    setIsEnable(true);
                  },
                  // value: fullname,
                })}
              />
            </div>
          </div>
          <div class="row text-start mb-3">
            <div className="col-3"></div>
            <div className="col-auto">
              {errors.fullname && (
                <span className="text-danger">Xin hãy điền vào phần này!</span>
              )}
            </div>
          </div>
          <div class="row g-3 align-items-center text-start">
            <div class="col-3">
              <label for="info" class="col-form-label">
                Email
              </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                id="info"
                class="form-control"
                // value={email}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Vui lòng điền vào mục này.",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không hợp lệ",
                  },
                  // value: email,
                  onChange: (e) => {
                    console.log("email change");
                    setEmail(e.target.value);
                    setIsEnable(true);
                  },
                })}
              />
            </div>
          </div>
          <div class="row text-start mb-3">
            <div className="col-3"></div>
            <div className="col-auto">
              {errors.email && (
                <div className="text-danger text-start">
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>
          <div class="row g-3 align-items-center text-start">
            <div class="col-3">
              <label for="inputPassword6" class="col-form-label">
                Username
              </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                // value={username}
                class="form-control"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Vui lòng điền vào mục này.",
                  },
                  // value: username,
                  onChange: (e) => {
                    setUsername(e.target.value);
                    setIsEnable(true);
                  },
                })}
              />
            </div>
          </div>
          <div class="row text-start mb-3">
            <div className="col-3"></div>
            <div className="col-auto">
              {errors.username && (
                <div className="text-danger text-start">
                  {errors.username.message}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-3">
                {isEnable ? (
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Cập nhật
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    disabled
                    style={{ width: "100%" }}
                  >
                    Cập nhật
                  </button>
                )}
              </div>
              <div className="col-3">
                {isEnable ? (
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                    onClick={onCancleChange}
                    type="button"
                  >
                    Hủy
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    disabled
                    style={{ width: "100%" }}
                  >
                    Hủy
                  </button>
                )}
              </div>
              <div className="col-3"></div>
            </div>
          </div>

          {message && (
            <div className="animate pop p-3 bg-info bg-opacity-10 border border-info rounded">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;

  return { user };
}

export default connect(mapStateToProps)(ProfileSettings);
