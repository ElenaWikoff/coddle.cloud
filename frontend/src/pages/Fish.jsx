import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { capitalizeEachWord, getDistribution } from "../utils/functions.jsx";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import parse from "html-react-parser";
import CustomCarousel from "../components/carousel/CustomCarousel.jsx";

const Fish = () => {
   const navigate = useNavigate();
   const data = useLoaderData();
   const [carousel, setCarousel] = useState(null);
   const [carouselLoading, setCarouselLoading] = useState(false);

   useEffect(() => {
      if (data) {
         setCarouselLoading(true);
         fetch(`/api/lures?page=1&limit=100`)
            .then((res) => res.json())
            .then((lures) => {
               const data_lure_ids = data.lures.map((lure) => lure.id);
               const lure_ids = lures.results.map((lure) => lure.id);
               const f = lures.results.filter((lure) => {
                  return data_lure_ids.includes(lure.id);
               });
               console.log(f);
               setCarouselLoading(false);
               setCarousel(f);
            })
            .catch((error) => {
               setCarouselLoading(false);
               console.error(`Fetching fish lures info failed: ${error}`);
            });
      }
   }, [data]);

   return (
      <PageContainer>
         {data && (
            <Container className="p-5">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>
               <figure>
                  <div className="image-wrapper" style={{ maxWidth: "500px" }}>
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
                  <ListGroup.Item>
                     Type: {capitalizeEachWord(data.type)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Environment: {capitalizeEachWord(data.environment)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Distribution: {getDistribution(data.distribution)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Depth Range: {`${(data.depth_min) ? data.depth_min : "?"}-${(data.depth_max) ? data.depth_max : "?"} m`}
                  </ListGroup.Item>
                  <ListGroup.Item>{`Max Length: ${data.length} cm`}</ListGroup.Item>
                  <ListGroup.Item>{`Max Weight: ${data.weight} kg`}</ListGroup.Item>
               </ListGroup>
               <div className="mt-4">
                  <p>Recommended Lures:</p>
                  <CustomCarousel
                     items={carousel}
                     type="lures"
                     loading={carouselLoading}
                     emptyMessage={"No recommended lures for this fish."}
                  />
               </div>
            </Container>
         )}
      </PageContainer>
   );
};

export default Fish;
