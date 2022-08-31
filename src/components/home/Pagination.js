import React, { Component, useEffect, useState } from "react";

export default function Pagination(props) {
    const [activePage, setActivePage] = useState(1);
  
    var pages = [];
  
    for (var i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  
    function handlePageChange(page) {
      setActivePage(page);
    }
  
    useEffect(() => {});
  
    return (
      <nav
        class="pagination d-flex justify-content-center"
        aria-label="Page navigation"
      >
        <ul class="pagination">
          <li class={activePage == 1 ? "page-item disabled" : "page-item"}>
            <a class="page-link disabled" href="#">
              &lt;
            </a>
          </li>
  
          {pages.map((page) => (
            <li class={page == activePage ? "page-item active" : "page-item"}>
              <a class="page-link" href="#">
                {page}
              </a>
            </li>
          ))}
          <li
            class={
              activePage == props.totalPages ? "page-item disabled" : "page-item"
            }
          >
            <a class="page-link" href="#">
              &gt;
            </a>
          </li>
        </ul>
      </nav>
    );
  }