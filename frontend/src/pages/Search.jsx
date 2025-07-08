import { useSearchParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { fetch_data } from "../utils/actions/api.jsx";
import ResultsContainer from "../components/search/ResultsContainer.jsx";

const Search = ({type}) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState();

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
               setData(data);
               setLoading(false);
            })
            .catch((error) => {
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

   const handleChange = (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
   };

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
         <Container fluid className="p-5">
            <h1>{getTitle()}</h1>
            <ResultsContainer
               data={data}
               type={type}
               loading={loading}
               error={error}
            />
         </Container>
      </PageContainer>
   );
};

export default Search;
