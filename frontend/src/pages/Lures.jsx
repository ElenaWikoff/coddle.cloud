import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { capitalizeEachWord } from "../utils/functions";
import CoddlePagination from "../components/pagination/CoddlePagination.jsx";
import { fetch_data } from "../utils/actions/api.jsx";

const Lures = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch_data("lures", searchParams).then((data) => {
         setData(data);
         setLoading(false);
      });
   }, [searchParams]);

   return (
      <PageContainer>
         <Container fluid className="p-4">
            <h1>Lures</h1>
            <Container className="mt-4 g-4 p-4">
               {!loading && data && (
                  <>
                     <ListGroup xs={2} sm={3} md={4} className="g-3">
                        {data.results.map((lure) => {
                           return (
                              <ListGroup.Item
                                 key={lure.id}
                                 className="row"
                                 as={Link}
                                 to={`/lures/${lure.id}`}
                              >
                                 <Col style={{ fontWeight: "600" }}>
                                    {capitalizeEachWord(lure.name)}
                                 </Col>
                              </ListGroup.Item>
                           );
                        })}
                     </ListGroup>
                     <CoddlePagination
                        page={searchParams.get("page")}
                        pages={searchParams.get("pages")}
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

export default Lures;
