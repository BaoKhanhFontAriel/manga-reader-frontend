import React, { Component, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Pagination(props) {

  // get page number in url
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? pageParam : 1;
  const [activePage, setActivePage] = useState(currentPage);

  var pages = [];

  for (var i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }

  function handlePageChange(index) {
    // setActivePage(index + 1);
    props.loadMangaOnPage(index);
  }

  function goToPrevPage(page) {
    if (page >= 2) {
      // setActivePage(page - 1);
      props.loadMangaOnPage(page - 2);
    }
  }

  function goToNextPage(page) {
    if (page < props.totalPages) {
      // setActivePage(page + 1);
      props.loadMangaOnPage(page);
    }
  }

  useEffect(() => {});

  return (
    <nav
      class="pagination d-flex justify-content-center mt-4"
      aria-label="Page navigation"
    >
      <ul class="pagination">
        <li
          class={activePage == 1 ? "page-item disabled" : "page-item" + " prev"}
          style={{ cursor: "default" }}
          onClick={() => goToPrevPage(activePage)}
        >
          <a class="page-link d-flex align-items-center">
            <span class="material-symbols-outlined">navigate_before</span>
          </a>
        </li>

        {pages.map((page, index) => (
          <li
            id={page}
            class={page == activePage ? "page-item active" : "page-item"}
            onClick={() => handlePageChange(index)}
            style={{ cursor: "default" }}
          >
            <a class="page-link">{page}</a>
          </li>
        ))}
        <li
          class={
            activePage == props.totalPages
              ? "page-item disabled"
              : "page-item" + " next"
          }
          style={{ cursor: "default" }}
          onClick={() => {
            goToNextPage(activePage);
          }}
        >
          <a class="page-link d-flex align-items-center">
            <span class="material-symbols-outlined">navigate_next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
