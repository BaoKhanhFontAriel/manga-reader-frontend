import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../helper/history";
import MangaService from "../../services/manga.service";

export function ChapterForm(props) {
  const { mangaid } = useParams();
  const [title, setTitle] = useState("");
  const [optional, setOptional] = useState("");
  const [pageUrls, setPageUrls] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { chapterid } = useParams();

  useEffect(() => {
    if (props.isEdit) {
      MangaService.getChapterById(chapterid)
        .then((res) => {
          setTitle(res.data.title.substring(8));
          setOptional(res.data.optional);
          setPageUrls(res.data.pageUrls);
          let defaultValues = {
            title: res.data.title.substring(8),
            optional: res.data.optional,
            pageUrls: res.data.pageUrls,
          };
          reset({ ...defaultValues });
        })
        .catch(function (ex) {
          setMessage(ex);
          setTimeout(() => setMessage(""), 3000);
        });
    }
  }, []);

  const onSubmit = (data) => {
    let chapterDetail = {
      title: "Chapter " + title,
      optional: optional,
      pageUrls: pageUrls,
      mangaid: mangaid,
      uploaderid: props.user.id,
    };

    if (props.isAddNew) {
      MangaService.addNewChapter(mangaid, chapterDetail)
        .then((res) => {
          setMessage("Thêm chương thành công!");
          setTitle("");
          setPageUrls("");
          setOptional("");
        })
        .catch(function (ex) {
          setMessage("Thêm chương thất bại!");
        });
    }

    if (props.isEdit) {
      MangaService.editChapter(chapterid, chapterDetail)
        .then((res) => {
          history.push(`/user/dashboard/chapters/${chapterid}/detail`);
          window.location.reload();
        })
        .catch(function (ex) {
          setMessage(ex);
        });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="chapterForm"
        className="chapter-form border rounded p-4"
      >
        <div class="row g-3 align-items-center text-start">
          <div class="col-3">
            <label for="number" class="col-form-label">
              Tên chương
            </label>
          </div>
          <div class="col-2">
            <input
              type="text"
              id="number"
              class="form-control"
              min="1"
              aria-describedby="number"
              {...register("title", {
                valueAsNumber: true,

                validate: {
                  isPositive: (value) =>
                    value >= 0 ||
                    "Vui lòng điền chữ số lớn hoặc bằng 0 ở mục này!",
                },
                required: true,
                onChange: (e) => setTitle(e.target.value),
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-3"></div>
          <div className="col-auto">
            {errors.title && (
              <span className="text-danger">{errors.title.message}</span>
            )}
          </div>
        </div>
        <div class="row g-3 align-items-center text-start">
          <div class="col-3">
            <label for="info" class="col-form-label">
              Ghi chú
            </label>
          </div>
          <div class="col-5">
            <input
              type="text"
              id="info"
              class="form-control"
              placeholder="(Không bắt buộc)"
              {...register("optional", {
                maxLength: 10,
                onChange: (e) => {
                  setOptional(e.target.value);
                },
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-3"></div>
          <div className="col-auto">
            {errors.optional && (
              <span className="text-danger">
                Thông tin thêm ngắn hơn 10 ký tự
              </span>
            )}
          </div>
        </div>
        <div class="row g-3 align-items-center text-start">
          <div class="col-3">
            <label for="inputPassword6" class="col-form-label">
              Link trang
            </label>
          </div>
          <div class="col-9">
            <textarea
              rows="10"
              type="link"
              id="link"
              placeholder="Dán link các trang ở đây, xuống dòng cuối link mỗi trang"
              class="form-control"
              {...register("pageUrls", {
                required: true,
                onChange: (e) => setPageUrls(e.target.value),
              })}
            />
          </div>
        </div>
        <div class="row text-start mb-3">
          <div className="col-3"></div>
          <div className="col-auto">
            {errors.pageUrls && (
              <span className="text-danger">Vui lòng điền vào phần này!</span>
            )}
          </div>
        </div>
        {props.isAddNew && (
          <div className="mb-3">
            <button className="btn btn-primary">Đăng tải</button>
          </div>
        )}
        {props.isEdit && (
          <div className="mb-3">
            <button className="btn btn-primary">Cập nhật</button>
          </div>
        )}
        {message && (
          <div className="p-3 bg-info bg-opacity-10 border border-info rounded animate pop">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(ChapterForm);
