import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageContainer from "../components/PageContainer";
import HeroMap from "../components/herobanner/HeroMap.jsx";
import CustomCarousel from "../components/carousel/CustomCarousel.jsx";

const Spots = () => {
   const navigate = useNavigate();
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [fishSpecies, setFishSpecies] = useState(null);
   const [carousel, setCarousel] = useState(null);
   const [carouselLoading, setCarouselLoading] = useState(false);

   const handleSelectSpot = (spot) => {
      navigate(`/spots/${spot.id}`);
      setFishSpecies(spot.fish_ids);
   };

   useEffect(() => {
      setLoading(true);
      fetch(`/api/locations`)
         .then((res) => res.json())
         .then((data) => {
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
         setCarouselLoading(true);
         fetch(`/api/fish?page=1&limit=100`)
            .then((res) => res.json())
            .then((data) => {
               const f = data.results.filter(({ id }) =>
                  fishSpecies.includes(id)
               );
               setCarouselLoading(false);
               setCarousel(f);
            })
            .catch((error) => {
               setCarouselLoading(false);
               setError(`Fetching location fish info failed: ${error}`);
               console.error(`Fetching location fish info failed: ${error}`);
            });
      }
   }, [fishSpecies]);

   return (
      <PageContainer>
         {!loading && data && (
            <HeroMap spots={data} onSelect={handleSelectSpot} />
         )}
         <CustomCarousel
            items={carousel}
            type="fish"
            loading={carouselLoading}
            preMessage={"Click on spot to see fish species at location."}
            emptyMessage={"No fish information about spot."}
         />
      </PageContainer>
   );
};

export default Spots;
