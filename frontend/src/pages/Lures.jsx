import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { capitalizeEachWord } from "../utils/functions";

const Lures = () => {
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch(`/api/lures`)
         .then((res) => res.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         })
         .catch((error) => {
            setError(`Fetching lures info failed: ${error}`);
            setLoading(false);
            console.error(`Fetching lures info failed: ${error}`);
         });
   }, [params]);

   return (
      <PageContainer>
         <Container className="mt-4 p-4">
            <h1>Lures</h1>
            <ListGroup>
               {(!loading && data) &&
                  data.map((lure) => {
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
         </Container>
      </PageContainer>
   );
};

export default Lures;
