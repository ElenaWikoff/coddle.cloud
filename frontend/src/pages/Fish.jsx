import { useState, useEffect } from "react";
import {
   createSearchParams,
   Link,
   useLoaderData,
   useNavigate,
} from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { capitalizeEachWord, getDistribution } from "../utils/functions.jsx";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import parse from "html-react-parser";
import CustomCarousel from "../components/carousel/CustomCarousel.jsx";
import { fetch_complex } from "../utils/actions/api.jsx";
import Tag from "../components/card/Tag.jsx";

const Fish = () => {
   const navigate = useNavigate();
   const data = useLoaderData();
   const [carousel, setCarousel] = useState(null);
   const [carouselLoading, setCarouselLoading] = useState(false);

   const handleTagClick = (label, type) => {
      const searchParams = createSearchParams();
      searchParams.set(type, label);
      navigate({
         pathname: "/fish-species",
         search: searchParams.toString(),
      });
   };

   useEffect(() => {
      if (data) {
         setCarouselLoading(true);
         fetch_complex(
            "lures",
            data.lures.map((lure) => lure.id),
            ["id", "name", "image_url"]
         )
            .then((lures) => {
               setCarouselLoading(false);
               setCarousel(lures);
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
            <Container className="py-5">
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
                        alt={
                           data.image_attribution
                              ? `Illustration of a ${capitalizeEachWord(data.common_name)}`
                              : "Placeholder fish image"
                        }
                     />
                  </div>
                  {data.image_attribution && (
                     <figcaption>Attribution: {parse(data.image_attribution)}</figcaption>
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
                     Type:&nbsp;
                     <Tag
                        label={data.type}
                        type="type"
                        onClick={() => handleTagClick(data.type, "type")}
                     />
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                     Environment:&nbsp;
                     <Tag
                        label={data.environment}
                        type="environment"
                        onClick={() =>
                           handleTagClick(data.environment, "environment")
                        }
                     />
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Distribution:&nbsp;
                     <Tag
                        label={data.distribution}
                        type="distribution"
                        onClick={() =>
                           handleTagClick(data.distribution, "distribution")
                        }
                     />
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Depth Range:{" "}
                     {`${data.depth_min ? data.depth_min : "?"}-${data.depth_max ? data.depth_max : "?"} m`}
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
               <div className="mt-4" style={{ textAlign: "center" }}>
                  Reference:&nbsp;
                  <em>{data.ref}</em>
               </div>
            </Container>
         )}
      </PageContainer>
   );
};

export default Fish;
