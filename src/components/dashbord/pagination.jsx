import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.css";

export default function PaginatedItems({ itemsPerPage, data, setPages }) {
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    setPages(event.selected + 1);
  };

  return (
    <ReactPaginate
      nextLabel=">>"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<<"
      renderOnZeroPageCount={null}
      containerClassName={styles.custem_pagination}
      pageLinkClassName={styles.ancor_link}
      activeLinkClassName={styles.active_link}
    />
  );
}
