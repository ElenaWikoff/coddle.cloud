import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ResultsGrid from "./ResultsGrid";
import LoadSpinner from "../LoadSpinner";
import CoddlePagination from "../pagination/CoddlePagination";
import Form from "react-bootstrap/Form";
import { capitalizeEachWord } from "../../utils/functions";

const ResultsContainer = ({ data, type, loading, error, sorts, onSort, query }) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();
   const [sortValue, setSortValue] = useState(searchParams.get('sort'));

   const handleSort = (value) => {
      setSortValue(value);
      onSort(value);
   }

   const handleNavigate = (url) => {
      navigate(url, { resetScroll: false });
   };

   const convertSort = (sort) => {
      let icon = null;
      if (sort[0] === "+") {
         icon = "↑";
      } else if (sort[0] === "-") {
         icon = "↓";
      } else {
         return sort;
      }

      return `${capitalizeEachWord(sort.slice(1))} ${icon}`;
   };

   return (
      <Container className="mt-4 p-0 m-0">
         <LoadSpinner loading={loading && !data} />
         {error && <p>Failed to fetch data.</p>}
         {!loading && data && (
            <>
               <div className="results-header d-flex justify-content-between align-items-center">
                  <p>{data.pagination.total} results found.</p>
                  {sorts && (
                     <Form.Select
                        className="sort-select"
                        aria-label="Sort Results"
                        onChange={(event) => handleSort(event.target.value)}
                        size="sm"
                        value={sortValue || "+id"}
                     >
                        {sorts.sort.map((sort) => (
                           <option key={`sort-${sort}`} value={sort}>{convertSort(sort)}</option>
                        ))}
                     </Form.Select>
                  )}
               </div>
               <ResultsGrid results={data.results} type={type} query={query} />
               <CoddlePagination
                  page={data.pagination.page}
                  pages={data.pagination.pages}
                  onNext={data.pagination.next}
                  onPrev={data.pagination.prev}
                  onFirst={data.pagination.first}
                  onLast={data.pagination.last}
                  onClick={handleNavigate}
               />
            </>
         )}
      </Container>
   );
};

export default ResultsContainer;
