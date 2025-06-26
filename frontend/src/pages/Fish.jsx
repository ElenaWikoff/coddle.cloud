import { Link, useLoaderData, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { capitalizeEachWord } from "../utils/functions.jsx";
import PageContainer from "../components/PageContainer";
import Ratio from "react-bootstrap/Ratio";
import { BsArrowLeft } from "react-icons/bs";
import parse from 'html-react-parser';

const Fish = () => {
   const navigate = useNavigate();
   const data = useLoaderData();

   return (
      <PageContainer>
         {data && (
            <Container className="m-4 g-4">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>
               <figure>
                  <Ratio
                     style={{ maxWidth: "800px", margin: "0 auto" }}
                     aspectRatio="16x9"
                  >
                     <img
                        style={{ objectFit: "contain" }}
                        src={`/images/${data.image.filename}`}
                        alt={capitalizeEachWord(data.common_name)}
                     />
                  </Ratio>
                  {data.image.attribution && <figcaption>{parse(data.image.attribution)}</figcaption>}
               </figure>

               <h2 className="page-title mt-4">
                  {capitalizeEachWord(data.common_name)}
               </h2>
               <h3 className="page-subtitle">
                  {data.scientific_name[0].toUpperCase() +
                     data.scientific_name.slice(1)}
               </h3>
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
