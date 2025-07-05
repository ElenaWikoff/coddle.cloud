import { Link, useNavigate, useLoaderData, useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import PageContainer from "../components/PageContainer";
import FishCard from "../components/card/FishCard.jsx";
import CoddlePagination from "../components/pagination/CoddlePagination.jsx";
import { fetch_data } from "../utils/actions/api.jsx";

const FishSpecies = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   // const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch_data('fish', searchParams)
      .then((data) => {
         setData(data);
         setLoading(false);
      });
   }, [searchParams]);

   return (
      <PageContainer>
         <Container fluid className="p-4">
            <h1>Fish Species</h1>
            <Container className="mt-4 g-4 p-4">
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
                        page={searchParams.get('page')}
                        pages={searchParams.get('pages')}
                        onNext={() => navigate(data.pagination.next)}
                        onPrev={() => navigate(data.pagination.prev)}
                        onFirst={() => navigate(data.pagination.first)}
                        onLast={() => navigate(data.pagination.last)}
                     />
                  </>
               )}
            </Container>
         </Container>
      </PageContainer>
   );
};

export default FishSpecies;
