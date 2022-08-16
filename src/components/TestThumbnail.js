import React, { Component } from "react";

export default function TestThumbnail (props) {
    return (
      <img
        class="rounded border"
        style={{ width: props.width, height: props.height, objectFit : props.fit }}
        src="http://i.truyenvua.com/ebook/190x247/ket-thuc-nhat-dinh-se-co-hau_1627179577.jpg?r=r8645456"
      ></img>
    );
}
