import { Link, useParams } from "react-router-dom";
import "./Pagination.css";

function Pagination({ totalResults, resultsPerPage }) {
  const { query, pageNumber } = useParams();
  // Tính toán số lượng trang dựa trên tổng số kết quả và kết quả trên mỗi trang
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Render các nút hoặc liên kết cho từng trang
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Link key={i} to={`/search/${query}/page/${i}`}>
        <button
          className={`btnPage ${parseInt(pageNumber) === i ? "active" : ""}`}
        >
          {i}
        </button>
      </Link>
    );
  }

  return <div className="pagination">{pages}</div>;
}

export default Pagination;
