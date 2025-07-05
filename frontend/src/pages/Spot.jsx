import { Link, useLoaderData, useParams, useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import PageContainer from "../components/PageContainer";
import { BsArrowLeft } from "react-icons/bs";
import { capitalizeEachWord } from "../utils/functions.jsx";
import { useEffect, useState } from "react";

const Spot = () => {
   const navigate = useNavigate();
   const params = useParams();
   const data = useLoaderData();
   const [fishData, setFishData] = useState();

   // useEffect(() => {
   //    if (data && data.fish_species) {
   //       fishSpeciesLoader(params).then((species) => {
   //          setFishData(
   //             species.results.filter((fish) =>
   //                data.fish_species.includes(fish.id)
   //             )
   //          );
   //       });
   //    }
   // }, [data]);

   return (
      <PageContainer>
         {data && (
            <Container className="m-4 g-4">
               <a className="cta" onClick={() => navigate(-1)}>
                  <BsArrowLeft /> Go Back
               </a>

               <h2 className="page-title mt-4">
                  {capitalizeEachWord(data.feature_name)}
               </h2>

               {data.city && (
                  <h3
                     className="page-subtitle"
                     style={{ fontWeight: "400", fontSize: "1.5em" }}
                  >
                     {capitalizeEachWord(data.city)}
                     {` (${data.coordinates.lattitude.toFixed()}, ${data.coordinates.longitude.toFixed(
                        3
                     )})`}
                  </h3>
               )}

               {/* <ListGroup>
                  <ListGroup.Item>
                     Type: {capitalizeEachWord(data.type)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Fish:&nbsp;
                     {fishData &&
                        fishData.map((fish, index, array) => {
                           return (
                              <Link
                                 key={`fish-${fish.id}`}
                                 to={`/fish-species/${fish.id}`}
                                 style={{ textDecoration: "none" }}
                              >
                                 {`
                                    ${capitalizeEachWord(fish.common_name)}${
                                    index !== array.length - 1 ? ", " : ""
                                 }`}
                              </Link>
                           );
                        })}
                  </ListGroup.Item>
               </ListGroup> */}
            </Container>
         )}
      </PageContainer>
   );
};

export default Spot;
