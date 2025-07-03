import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { capitalizeEachWord } from "../utils/functions.jsx";
import HeroMap from "../components/herobanner/HeroMap.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FishCard from "../components/card/FishCard.jsx";
import { fishLoader } from "../utils/actions/loaders.jsx";

const responsive = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
   },
   desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
   },
   tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
   },
};

const Spots = () => {
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [fishSpecies, setFishSpecies] = useState(null);
   const [carousel, setCarousel] = useState(null);

   const handleSelectSpot = (spot) => {
      console.log(spot);
      setFishSpecies(spot.fish_ids);
   };

   useEffect(() => {
      setLoading(true);
      fetch(`/api/locations`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setData(data);
            setLoading(false);
         })
         .catch((error) => {
            setError(`Fetching locations info failed: ${error}`);
            setLoading(false);
            console.error(`Fetching locations info failed: ${error}`);
         });
   }, []);

   useEffect(() => {
      if (fishSpecies) {
         fetch(`/api/fish`)
            .then((res) => res.json())
            .then((data) => {
               const f = data.filter(({ id }) => fishSpecies.includes(id));
               console.log(f);
               setCarousel(f);
            })
            .catch((error) => {
               setError(`Fetching location fish info failed: ${error}`);
               setLoading(false);
               console.error(`Fetching location fish info failed: ${error}`);
            });
      }
   }, [fishSpecies]);

   return (
      <PageContainer>
         {(!loading && data) && <HeroMap spots={data} onSelect={handleSelectSpot} />}
         <Container fluid>
            {carousel && (
               <Carousel responsive={responsive}>
                  {carousel &&
                     carousel.map((fish) => {
                        return <FishCard fish={fish} inCarousel={true} />;
                     })}
               </Carousel>
            )}
         </Container>
      </PageContainer>
   );
};

export default Spots;
