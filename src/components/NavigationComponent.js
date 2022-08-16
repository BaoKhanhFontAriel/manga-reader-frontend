import React, { Component, useState } from "react";

export default class NavigationComponent extends Component {
  render() {
    const navStyle = {
      backgroundColor: "#293462",
      position: "sticky",
      top: "0",
    };

    return (
      <nav style={navStyle}>
        <div className="container">
          <div class="nav-menu" style={{ fontSize: "18px" }}>
            <ul class="d-flex" style={{ paddingLeft: "0px" }}>
              <NavItem text={"Trang Chủ"} />
              <NavItem
                text={"Thể Loại"}
                isDropdown={true}
                isCategory={true}
              ></NavItem>
              <NavItem
                text={"Xếp Hạng"}
                isDropdown={true}
                isRanking={true}
              ></NavItem>

              <NavItem text={"Tìm Truyện"} />
              <NavItem text={"Lịch Sử"} />
              <NavItem text={"Theo Dõi"} />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function CategoryDropdownMenu() {
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

function RankingDropdownMenu() {
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

function NavItem(props) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const boxStyle = {
    backgroundColor: isHover ? "white" : "",
    padding: "10px",
    position: "relative",
  };

  const linkStyle = {
    color: isHover ? "black" : "white",
  };

  return (
    <div
      class="nav-menu-item"
      style={boxStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a style={linkStyle} class="" href="#">
        <div class="d-flex align-items-center">
          {props.text}
          <ExpandMoreIcon isDropdown={props.isDropdown} />
        </div>
      </a>

      {isHover && props.isDropdown == true && props.isCategory == true && (
        <CategoryDropdownMenu />
      )}
      {isHover && props.isDropdown == true && props.isRanking == true && (
        <RankingDropdownMenu />
      )}
    </div>
  );
}

function ExpandMoreIcon(props) {
  if (props.isDropdown == true) {
    return <span class="material-symbols-outlined">expand_more</span>;
  }
  return "";
}
