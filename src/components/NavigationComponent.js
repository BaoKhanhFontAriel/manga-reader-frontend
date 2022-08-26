import React, { Component, useState } from "react";
import { CategoryDropdownMenu, RankingDropdownMenu } from "./DropdownMenu";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";

export default class NavigationComponent extends Component {
  render() {
    const navStyle = {
      backgroundColor: "#293462",
      position: "sticky",
      top: "0",
    };

    return (
      <>
        <nav style={navStyle}>
          <div className="container">
            <div class="nav-menu" style={{ fontSize: "18px" }}>
              <ul class="d-flex" style={{ paddingLeft: "0px" }}>
                <NavItem text={"Trang Chủ"}  />
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
        {/* <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes> */}
      </>
    );
  }
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
      <div style ={linkStyle}>
        <div class="d-flex align-items-center">
          {props.text}
          <ExpandMoreIcon isDropdown={props.isDropdown} />
        </div>
      </div>

      {isHover && props.isDropdown === true && props.isCategory === true && (
        <CategoryDropdownMenu />
      )}
      {isHover && props.isDropdown === true && props.isRanking === true && (
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
