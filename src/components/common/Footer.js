import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer style={{ backgroundColor: "var(--orange-dark)", }}>
        <div class="container py-3">
          <div class="web-icon">
            <span
              style={{ color: "black", fontSize: "36px" }}
              class="rubik-dirt-font"
            >
              MangaPunch
            </span>
          </div>
          <div>About | FAQ | Contact | Blog</div>
          <div>
            TORICO | Terms & Condition | Privacy Policy | Service Disclaimer |
            Review Guideline Copyright © TORICO All Rights Reserved
          </div>
        </div>
      </footer>
    );
  }
}
