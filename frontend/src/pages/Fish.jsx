import { Link, useLoaderData, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { capitalizeEachWord, getDistribution } from "../utils/functions.jsx";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import parse from "html-react-parser";

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
                  <div className="image-wrapper" style={{maxWidth: '500px'}}>
                     <img
                        style={{ objectFit: "contain" }}
                        src={
                           data.image_attribution
                              ? `/images/fish/${data.id}.png`
                              : `/images/fish/placeholder.png`
                        }
                        alt={capitalizeEachWord(data.common_name)}
                     />
                  </div>
                  {data.image_attribution && (
                     <figcaption>{parse(data.image_attribution)}</figcaption>
                  )}
               </figure>

               <h2 className="page-title mt-4">
                  {capitalizeEachWord(data.common_name)}
               </h2>
               <h3 className="page-subtitle">
                  {data.scientific_name[0].toUpperCase() +
                     data.scientific_name.slice(1)}
               </h3>
               <ListGroup>
                  <ListGroup.Item>Type: {capitalizeEachWord(data.type)}</ListGroup.Item>
                  <ListGroup.Item>
                     Environment: {capitalizeEachWord(data.environment)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Distribution: {getDistribution(data.distribution)}
                  </ListGroup.Item>
                  <ListGroup.Item>{`Max Length: ${data.length} cm`}</ListGroup.Item>
                  <ListGroup.Item>{`Max Weight: ${data.weight} kg`}</ListGroup.Item>
               </ListGroup>
            </Container>
         )}
      </PageContainer>
   );
};

export default Fish;
