import React, { Component, useState } from "react";
import Footer from "./Footer";
import HeaderComponent from "./HeaderComponent";
import NavigationComponent from "./NavigationComponent";

export default class ChapterPage extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <NavigationComponent />
        ChapterPage
        <Footer/>
      </div>
    );
  }
}

function MainContent(props) {
    const [chapter, setChapter] = useState([]);

    
}
