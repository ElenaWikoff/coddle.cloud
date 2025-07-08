// Deprecated by Search.jsx
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import PageContainer from "../components/PageContainer";
import FishCard from "../components/card/FishCard.jsx";
import CoddlePagination from "../components/pagination/CoddlePagination.jsx";
import { fetch_data } from "../utils/actions/api.jsx";
import LoadSpinner from "../components/LoadSpinner.jsx";

const FishSpecies = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(false);

   useEffect(() => {
      setLoading(true);
      const currentSearchParams = new URLSearchParams(searchParams.toString());
      let needsUpdate = false;

      // If url is missing search params, set default search params
      if (!currentSearchParams.has("page")) {
         currentSearchParams.set("page", "1");
         needsUpdate = true;
      } else if (!currentSearchParams.has("limit")) {
         currentSearchParams.set("limit", "12");
         needsUpdate = true;
      }

      // When search params set, fetch data
      if (needsUpdate) {
         setSearchParams(currentSearchParams);
      } else {
         fetch_data("fish", searchParams)
         .then((data) => {
            setData(data);
            setLoading(false);
         })
         .catch((error) => {
            setError(true);
         });
      }
   }, [searchParams, setSearchParams]);

   const handleChange = (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
   };

   const handleNavigate = (url) => {
      navigate(url);
   };

   return (
      <PageContainer>
         <Container fluid className="p-4">
            <h1>Fish Species</h1>
            <Container className="mt-4 g-4 p-4">
               <LoadSpinner loading={loading && !data} />
               {error && <p>Failed to fetch data.</p>}
               {!loading && data && (
                  <>
                     <Row xs={2} sm={3} md={4} className="g-3">
                        {data.results.map((fish) => {
                           return (
                              <Col key={fish.id}>
                                 <FishCard fish={fish} />
                              </Col>
                           );
                        })}
                     </Row>
                     <CoddlePagination
                        page={searchParams.get("page")}
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
         </Container>
      </PageContainer>
   );
};

export default FishSpecies;
