import { useLoaderData, useParams } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { capitalizeEachWord } from "../utils/functions.jsx"
import PageContainer from "../components/PageContainer";

const Fish = () => {
   const data = useLoaderData();
//    console.log(data);

   return (
      <PageContainer>
         {data && (
            <Container className="mt-4 g-4">
               <h2 className="page-title">{capitalizeEachWord(data.common_name)}</h2>
               <h3 className="page-subtitle">{data.scientific_name[0].toUpperCase() + data.scientific_name.slice(1)}</h3>
               <ListGroup>
                  <ListGroup.Item>Type: {data.type}</ListGroup.Item>
                  <ListGroup.Item>
                     Environment: {data.environment}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Distribution: {data.distribution}
                  </ListGroup.Item>
                  <ListGroup.Item>{`Max Length: ${data.max_sizes.length} ${data.max_sizes_units.length}`}</ListGroup.Item>
                  <ListGroup.Item>{`Max Weight: ${data.max_sizes.weight} ${data.max_sizes_units.weight}`}</ListGroup.Item>
               </ListGroup>
            </Container>
         )}
      </PageContainer>
   );
};

export default Fish;
