import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";
import  Navigation from "../common/Navigation";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

export default class GenrePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation></Navigation>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-9">
                <MainContent></MainContent>
              </div>
              <div className="col-3">
                <Sidebar></Sidebar>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}
