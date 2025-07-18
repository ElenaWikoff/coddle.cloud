import { Link, useLoaderData, useParams, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import { capitalizeEachWord } from "../utils/functions.jsx";
import { useEffect, useState } from "react";
import Tag from "../components/card/Tag.jsx";

const Lure = () => {
   const navigate = useNavigate();
   const data = useLoaderData();

   const handleClick = (base_url, label, type) => {
      navigate(`${base_url}?${type}=${label}`);
   }

   return (
      <PageContainer>
         {data && (
            <Container className="py-5">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>

               {data.image_url && (
                  <figure>
                     <div
                        className="image-wrapper"
                        style={{ maxWidth: "500px", overflow: "hidden" }}
                     >
                        <img
                           style={{ objectFit: "contain" }}
                           src={data.image_url}
                           alt={capitalizeEachWord(data.name)}
                        />
                     </div>
                     {data.image_url && (
                     <figcaption><a href={data.image_url}>Image Link</a></figcaption>
                  )}
                  </figure>
               )}

               <div className="d-flex gap-2 align-items-center">
                  <h2 className="page-title">
                     {capitalizeEachWord(data.name)}
                  </h2>
                  <h3
                     className="page-subtitle"
                     style={{ fontWeight: "400", fontSize: "1.5em" }}
                  >
                     <Tag label={data.type} type="lure-type" onClick={() => handleClick("/lures", data.type, "type")} />
                  </h3>
               </div>

               <ListGroup>
                  <ListGroup.Item>
                     Application:&nbsp;
                     <span className="d-inline-flex gap-1 align-items-center flex-wrap">
                     {data.application.map((item, index, array) => {
                        return (
                           <Tag
                                 key={`item-${index}`}
                                 label={item}
                                 type="application"
                                 onClick={() => handleClick("/lures", item, "application")}
                              />
                        );
                     })}
                     </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Good For:&nbsp;
                     <span className="d-inline-flex gap-1 align-items-center flex-wrap">
                        {data.fish_types.map((item, index) => {
                           return (
                              <Tag
                                 key={`item-${index}`}
                                 label={item}
                                 type="type"
                                 onClick={() => handleClick("/fish-species", item, "type")}
                              />
                           );
                        })}
                     </span>
                  </ListGroup.Item>
               </ListGroup>
               <div className="mt-4" style={{textAlign: "center"}}>
                     Reference:&nbsp;
                     <em><a href="https://www.sportsmans.com/fishing-lures-types-chart?srsltid=AfmBOoqPFASy-g_T43gRWZ_EQmLTcWGinJYA_eq6oR3f6jaPKSvACNWU" target="_blank">Fish Lures Type Chart</a></em>
               </div>
            </Container>
         )}
      </PageContainer>
   );
};

export default Lure;
