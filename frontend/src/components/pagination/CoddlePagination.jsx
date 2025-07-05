import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import { capitalizeEachWord } from "../../utils/functions.jsx";
import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

const CoddlePagination = ({ page, pages, onNext, onPrev, onFirst, onLast }) => {
   return (
      <Pagination className="mt-4">
         <Pagination.First disabled={page === 1} onClick={onFirst} />
         <Pagination.Prev disabled={page === 1} onClick={onPrev} />
         <Pagination.Item active>{page}</Pagination.Item>
         <Pagination.Next disabled={page === pages} onClick={onNext} />
         <Pagination.Last disabled={page === pages} onClick={onLast} />
      </Pagination>
   );
};

export default CoddlePagination;
