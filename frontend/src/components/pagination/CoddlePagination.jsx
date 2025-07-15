import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord } from "../../utils/functions.jsx";
import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

const CoddlePagination = ({ page, pages, onNext, onPrev, onFirst, onLast, onClick }) => {
   return pages > 1 ? (
      <Pagination className="d-flex justify-content-center mt-4 mx-auto w-auto">
         <Pagination.First disabled={!onFirst} onClick={() => onClick(onFirst)} />
         <Pagination.Prev disabled={!onPrev} onClick={() => onClick(onPrev)} />
         <Pagination.Item active>{page}</Pagination.Item>
         <Pagination.Next disabled={!onNext} onClick={() => onClick(onNext)} />
         <Pagination.Last disabled={!onLast} onClick={() => onClick(onLast)} />
      </Pagination>
   ) : null;
};

export default CoddlePagination;
