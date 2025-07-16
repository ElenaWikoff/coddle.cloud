import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import PageContainer from "../components/PageContainer";
import HeroMap from "../components/herobanner/HeroMap.jsx";
import CustomCarousel from "../components/carousel/CustomCarousel.jsx";
import { fetch_complex, fetch_data } from "../utils/actions/api.jsx";
import { useDebounce } from "../utils/hooks.jsx";

const Spots = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [fishSpecies, setFishSpecies] = useState(null);
   const [carousel, setCarousel] = useState(null);
   const [carouselLoading, setCarouselLoading] = useState(false);
   const [query, setQuery] = useState("");
   const debouncedQuery = useDebounce(query, 300);

   const handleReset = () => {
      navigate('/spots');
   };

   // Select fishing spot marker
   const handleSelectSpot = (spot) => {
      navigate(`/spots/${spot.id}`);
      setFishSpecies(spot.fish_ids);
   };

   // Fetch location data
   useEffect(() => {
      setLoading(true);
      fetch_data("locations", searchParams)
         .then((data) => {
            setData(data);
            setLoading(false);
            if (!fishSpecies && id) {
               setFishSpecies(data.find((spot) => Number(spot.id) === Number(id)).fish_ids);
            }
         })
         .catch((error) => {
            setError(`Fetching locations info failed: ${error}`);
            setLoading(false);
            console.error(`Fetching locations info failed: ${error}`);
         });
   }, []);

   // Fetch data for fish carousel
   useEffect(() => {
      if (data) {
         setCarouselLoading(true);
         fetch_complex("fish", fishSpecies, [
            "id",
            "common_name",
            "image_attribution",
         ])
            .then((data) => {
               setCarouselLoading(false);
               setCarousel(data);
            })
            .catch((error) => {
               setCarouselLoading(false);
               setError(`Fetching location fish info failed: ${error}`);
               console.error(`Fetching location fish info failed: ${error}`);
            });
      }
   }, [fishSpecies]);

   // Handle search query value change
   const handleSearch = (value) => {
      setQuery(value);
   };

   // Debounce search query for 300 milliseconds.
   useEffect(() => {
      handleReset();
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (debouncedQuery) {
         newSearchParams.set("q", debouncedQuery);
      } else {
         newSearchParams.delete("q");
      }
      setSearchParams(newSearchParams);
   }, [debouncedQuery]);

   const handleFilter = (key, value) => {
      handleReset();
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
   };

   return (
      <PageContainer>
         {!loading && data && (
            <HeroMap
               spots={data}
               onSelect={handleSelectSpot}
               query={query}
               onSearch={handleSearch}
               onFilter={handleFilter}
            />
         )}
         <CustomCarousel
            items={carousel}
            type="fish"
            loading={carouselLoading}
            preMessage={"Click on spot to see fish species at location."}
            emptyMessage={"No fish information about spot."}
            query={query}
         />
      </PageContainer>
   );
};

export default Spots;
