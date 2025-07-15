import { useSearchParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { fetch_data } from "../utils/actions/api.jsx";
import ResultsContainer from "../components/search/ResultsContainer.jsx";
import FilterContainer from "../components/search/FilterContainer.jsx";
import { useDebounce } from "../utils/hooks.jsx";

const Search = ({ type }) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState();
   const [query, setQuery] = useState("");
   const debouncedQuery = useDebounce(query, 300);
   const [length, setLength] = useState(0);
   const debouncedLength = useDebounce(length, 300);
   const [weight, setWeight] = useState(0);
   const debouncedWeight = useDebounce(weight, 300);
   const [depth, setDepth] = useState(0);
   const debouncedDepth = useDebounce(depth, 300);
   const [filterData, setFilterData] = useState(null);

   useEffect(() => {
      if (type === "fish") {
         fetch("/FiltersExample.json")
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               setFilterData(data);
            });
      }
   }, []);

   // Set Defaults
   const handleReset = (searchParams) => {
      searchParams.set("page", 1);
      // searchParams.set("limit", 12);
   };

   // Debounce search query for 300 seconds.
   useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      handleReset(newSearchParams);
      if (debouncedQuery) {
         newSearchParams.set("q", debouncedQuery);
      } else {
         newSearchParams.delete("q");
      }
      setSearchParams(newSearchParams);
   }, [debouncedQuery]);

   // Handle search query value change
   const handleSearch = (value) => {
      setQuery(value);
   };

   // Debounce length for 300 seconds.
   useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      handleReset(newSearchParams);
      if (Number(debouncedLength)) {
         newSearchParams.set("length", debouncedLength);
      } else {
         newSearchParams.delete("length");
      }
      setSearchParams(newSearchParams);
   }, [debouncedLength]);

   // Debounce weight for 300 seconds.
   useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      handleReset(newSearchParams);
      if (Number(debouncedWeight)) {
         newSearchParams.set("weight", debouncedWeight);
      } else {
         newSearchParams.delete("weight");
      }
      setSearchParams(newSearchParams);
   }, [debouncedWeight]);

   // Debounce depth for 300 seconds.
   useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      handleReset(newSearchParams);
      if (Number(debouncedDepth)) {
         newSearchParams.set("depth", debouncedDepth);
      } else {
         newSearchParams.delete("depth");
      }
      setSearchParams(newSearchParams);
   }, [debouncedDepth]);

   const handleChange = (key, value) => {
      if (key === "weight" || key === "length" || key === "depth") {
         switch (key) {
            case "weight":
               setWeight(value);
               break;
            case "length":
               setLength(value);
               break;
            case "depth":
               setDepth(value);
               break;
            default:
               return;
         }
      } else {
         const newSearchParams = new URLSearchParams(searchParams.toString());
         if (value !== "all") {
            newSearchParams.set(key, value);
         } else {
            newSearchParams.delete(key);
         }
         setSearchParams(newSearchParams);
      }
   };

   const handleSort = (value) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      handleReset(newSearchParams);
      newSearchParams.set('sort', value);
      setSearchParams(newSearchParams);
   }

   useEffect(() => {
      setLoading(true);
      const currentSearchParams = new URLSearchParams(searchParams.toString());
      let needsUpdate = false;

      // If url is missing search params, set default search params
      if (!currentSearchParams.has("page")) {
         currentSearchParams.set("page", "1");
         needsUpdate = true;
      } else if (!currentSearchParams.has("limit")) {
         currentSearchParams.set("limit", "12");
         needsUpdate = true;
      }

      // When search params set, fetch data
      if (needsUpdate) {
         setSearchParams(currentSearchParams);
      } else if (type) {
         fetch_data(type, searchParams)
            .then((data) => {
               setLoading(false);
               setData(data);
            })
            .catch((error) => {
               setLoading(false);
               setError(error);
            });
      }

      // This cleanup when unmounts
      return () => {
         setLoading(true);
         setData(null);
         setError(null);
      };
   }, [searchParams, setSearchParams]);

   const getTitle = () => {
      if (type === "fish") {
         return "Fish Species";
      } else if (type === "lures") {
         return "Lures";
      } else {
         return "This should not happen";
      }
   };

   return (
      <PageContainer>
         <Container className="p-5">
            <h1>{getTitle()}</h1>
            <FilterContainer 
            data={filterData}
            type={type}
            onSearch={handleSearch} 
            onSelect={handleChange} />
            <ResultsContainer
               data={data}
               type={type}
               loading={loading}
               error={error}
               sorts={filterData}
               onSort={handleSort}
            />
         </Container>
      </PageContainer>
   );
};

export default Search;
