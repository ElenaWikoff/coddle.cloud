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
            <Container className="m-4 g-4">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>

               <h2 className="page-title mt-4">
                  {capitalizeEachWord(data.name)}
               </h2>

               <h3
                  className="page-subtitle"
                  style={{ fontWeight: "400", fontSize: "1.5em" }}
               >
                  {capitalizeEachWord(data.brand)}
               </h3>

               <ListGroup>
                  <ListGroup.Item>
                     Type: {capitalizeEachWord(data.type)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Application:&nbsp;
                     {data.application.map((item, index, array) => {
                           return (
                              <span
                                 key={`item-${index}`}
                              >
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
                              <span
                                 key={`item-${index}`}
                              >
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
