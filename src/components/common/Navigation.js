import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { CategoryDropdownMenu, RankingDropdownMenu } from "./DropdownMenu";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { history } from "../../helper/history";
export function Navigation(props) {
  const navStyle = {
    backgroundColor: "#293462",
    position: "sticky",
    top: "0",
    zIndex: "1",
  };

  return (
    <>
      <nav style={navStyle}>
        <div className="container">
          <div class="nav-menu" style={{ fontSize: "18px" }}>
            <ul class="d-flex" style={{ paddingLeft: "0px" }}>
              <NavItem text={"Trang Chủ"} linkTo="/" />
              <NavItem
                text={"Thể Loại"}
                isDropdown={true}
                isCategory={true}
                linkTo=""
              ></NavItem>
              <NavItem
                text={"Xếp Hạng"}
                isDropdown={true}
                isRanking={true}
                linkTo=""
              ></NavItem>

              <NavItem text={"Tìm Truyện"} linkTo="/search" />
              {props.isLoggedIn && (
                <NavItem text={"Theo Dõi"} linkTo={`/user/favorites`} />
              )}
              {props.isLoggedIn && (
                <NavItem text={"Dashboard"} linkTo={`/user/dashboard`} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export function NavItem(props) {
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
    cursor: "pointer",
  };

  const linkStyle = {
    color: isHover ? "black" : "white",
  };

  function redirectTo(link) {
    history.push(link);
    window.location.reload();
  }

  return (
    <div
      onClick={() => redirectTo(props.linkTo)}
      class="nav-menu-item"
      style={boxStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={linkStyle}>
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

export function ExpandMoreIcon(props) {
  if (props.isDropdown == true) {
    return <span class="material-symbols-outlined">expand_more</span>;
  }
  return "";
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Navigation);
