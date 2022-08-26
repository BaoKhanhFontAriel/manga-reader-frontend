import React, { useState, useEffect } from "react";

export function CategoryDropdownMenu() {
  const categoryDropdownStyle = {
    position: "absolute",
    top: "100%",
    start: "0",
    width: "400px",
    marginLeft: "-10px",
  };

  return (
    <div
      style={categoryDropdownStyle}
      class="category-dropdown-menu position-absolute shadow bg-body rounded"
    >
      <div class="row justify-content-start p-3 g-0">
        <div class="col-4">
          <DropdownItem text="Tất cả" />
          <DropdownItem text="Action" />
          <DropdownItem text="Adventure" />
          <DropdownItem text="Comedy" />
        </div>
        <div class="col-4">
          <DropdownItem text="Fantasy" />
          <DropdownItem text="Horror" />
          <DropdownItem text="Mystery" />
          <DropdownItem text="Shounen" />
        </div>
        <div class="col-4">
          <DropdownItem text="Shoujo" />
          <DropdownItem text="Historical" />
          <DropdownItem text="Slice of life" />
          <DropdownItem text="Tragedy" />
        </div>
      </div>
      <ul></ul>
    </div>
  );
}

export function RankingDropdownMenu() {
  const rankingDropdownStyle = {
    position: "absolute",
    top: "100%",
    start: "0",
    width: "160px",
    marginLeft: "-10px",
  };

  return (
    <div
      style={rankingDropdownStyle}
      class="category-dropdown-menu position-absolute shadow p-3 bg-body rounded"
    >
      <DropdownItem text="Top Xem" />
      <DropdownItem text="Top Theo Dõi" />
    </div>
  );
}

function DropdownItem(props) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const boxStyle = {
    backgroundColor: isHover ? "white" : "",
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "8px",
  };

  const linkStyle = {
    color: isHover ? "orange" : "black",
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={boxStyle}
    >
      <a style={linkStyle} class="" href="#">
        {props.text}
      </a>
    </li>
  );
}
