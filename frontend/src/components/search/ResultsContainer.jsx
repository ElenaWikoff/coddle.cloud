import { useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ResultsGrid from "./ResultsGrid";
import LoadSpinner from "../LoadSpinner";
import CoddlePagination from "../pagination/CoddlePagination";

const ResultsContainer = ({ data, type, loading, error }) => {
   const navigate = useNavigate();

   const handleNavigate = (url) => {
      navigate(url);
   };

   return (
      <Container className="mt-4 p-0 m-0">
         <LoadSpinner loading={loading && !data} />
         {error && <p>Failed to fetch data.</p>}
         {!loading && data && (
            <>
               <p>{data.pagination.total} results found.</p>
               <ResultsGrid results={data.results} type={type} />
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
