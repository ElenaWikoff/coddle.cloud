import { Link, useLoaderData, useParams, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import { capitalizeEachWord } from "../utils/functions.jsx";
import { useEffect, useState } from "react";

const Lure = () => {
   const navigate = useNavigate();
   const data = useLoaderData();

   return (
      <PageContainer>
         {data && (
            <Container className="p-5">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>

               {data.image_url && (
                  <figure>
                     <div
                        className="image-wrapper"
                        style={{ maxWidth: "500px" }}
                     >
                        <img
                           style={{ objectFit: "contain" }}
                           src={data.image_url}
                           alt={capitalizeEachWord(data.name)}
                        />
                     </div>
                     {/* {data.image_attribution && (
                     <figcaption>{parse(data.image_attribution)}</figcaption>
                  )} */}
                  </figure>
               )}

               <h2 className="page-title mt-4">
                  {capitalizeEachWord(data.name)}
               </h2>

               <h3
                  className="page-subtitle"
                  style={{ fontWeight: "400", fontSize: "1.5em" }}
               >
                  {capitalizeEachWord(data.type)}
               </h3>

               <ListGroup>
                  <ListGroup.Item>
                     Application:&nbsp;
                     {data.application.map((item, index, array) => {
                        return (
                           <span key={`item-${index}`}>
                              {`
                                    ${capitalizeEachWord(item)}${
                                       index !== array.length - 1 ? ", " : ""
                                    }`}
                           </span>
                        );
                     })}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Good For:&nbsp;
                     {data.fish_types.map((item, index, array) => {
                        return (
                           <span key={`item-${index}`}>
                              {`
                                    ${capitalizeEachWord(item)}${
                                       index !== array.length - 1 ? ", " : ""
                                    }`}
                           </span>
                        );
                     })}
                  </ListGroup.Item>
               </ListGroup>
            </Container>
         )}
      </PageContainer>
   );
};

export default Lure;
