import React, { Component } from "react";
import icon from "../image/onepunchman-cut.png";

class HeaderComponent extends Component {
  render() {
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
              <WebLogo/>
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
            <div class="col-3 d-flex justify-content-end">
              <a href="#">Đăng Nhập</a> <span class="ms-2 me-2">|</span>{" "}
              <a href="#">Đăng Ký</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export function WebLogo() {
  const webIconStyle = {
    color: "black",
    fontSize: "36px",
  };

  return (
    <div class="web-icon">
      <span style={webIconStyle} class="rubik-dirt-font">
        MangaPunch
      </span>
      <span>
        <img src={icon} alt="onepunch-icon" style={{ width: "78px" }}></img>
      </span>
    </div>
  );
}

export default HeaderComponent;
