import { useSearchParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import PageContainer from "../components/PageContainer";
import { fetch_data, fetch_metadata } from "../utils/actions/api.jsx";
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
  const [defaultFilterData, setDefaultFilterData] = useState();
  const [filterData, setFilterData] = useState(null);

  const handleClear = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("page", 1);
    if (searchParams.has("limit")) {
      newSearchParams.set("limit", searchParams.get("limit"));
    } else {
      newSearchParams.set("limit", 12);
    }
    if (searchParams.has("sort")) {
      newSearchParams.set("sort", searchParams.get("sort"));
    }
    setSearchParams(newSearchParams, { replace: true });
    const newFilterData = { ...defaultFilterData };
    setFilterData(newFilterData);
    setQuery("");
  };

  useEffect(() => {
    fetch_metadata(type)
      .then((data) => {
        const newFilters = data.filters.map((filter) => {
          const value = searchParams.has(filter.key)
            ? searchParams.get(filter.key)
            : filter.options[0];
          const newFilter = {
            ...filter,
            value,
          };
          return newFilter;
        });
        const newRanges = data.ranges.map((range) => {
          const value = searchParams.has(range.key)
            ? searchParams.get(range.key)
            : range.min;
          const newRange = {
            ...range,
            value,
          };
          return newRange;
        });
        const newData = {
          ...data,
          filters: newFilters,
          ranges: newRanges,
        };
        setFilterData(newData);
        setDefaultFilterData(newData);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // Set Defaults
  const handleReset = (searchParams) => {
    searchParams.set("page", 1);
    // searchParams.set("limit", 12);
  };

  // Debounce search query for 300 milliseconds.
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      newSearchParams.set("q", debouncedQuery);
    } else {
      newSearchParams.delete("q");
    }
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [debouncedQuery]);

  // Handle search query value change
  const handleSearch = (value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    handleReset(newSearchParams);
    setQuery(value);
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const setNewRangeData = (key, value) => {
    const newRanges = filterData.ranges.map((range) => {
      if (range.key === key) {
        const newRange = {
          ...range,
          value: value,
        };
        return newRange;
      } else {
        return range;
      }
    });
    const newFilterData = {
      ...filterData,
      ranges: newRanges,
    };
    setFilterData(newFilterData);
  };

  // Debounce length for 300 milliseconds.
  useEffect(() => {
    if (filterData) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (Number(debouncedLength)) {
        newSearchParams.set("length", debouncedLength);
      } else {
        newSearchParams.delete("length");
      }
      if (newSearchParams.toString() !== searchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
        setNewRangeData("length", debouncedLength);
      }
    }
  }, [debouncedLength]);

  // Debounce weight for 300 milliseconds.
  useEffect(() => {
    if (filterData) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (Number(debouncedWeight)) {
        newSearchParams.set("weight", debouncedWeight);
      } else {
        newSearchParams.delete("weight");
      }
      if (newSearchParams.toString() !== searchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
        setNewRangeData("weight", debouncedWeight);
      }
    }
  }, [debouncedWeight]);

  // Debounce depth for 300 milliseconds.
  useEffect(() => {
    if (filterData) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (Number(debouncedDepth)) {
        newSearchParams.set("depth", debouncedDepth);
      } else {
        newSearchParams.delete("depth");
      }
      if (newSearchParams.toString() !== searchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
      }
    }
  }, [debouncedDepth]);

  const handleChange = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    handleReset(newSearchParams);
    if (key === "weight" || key === "length" || key === "depth") {
      handleReset(newSearchParams);
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
      if (value !== "all") {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
      setSearchParams(newSearchParams, { replace: true });
      const newFilters = filterData.filters.map((filter) => {
        if (filter.key === key) {
          const newFilter = {
            ...filter,
            value: value,
          };
          return newFilter;
        } else {
          return filter;
        }
      });
      const newFilterData = {
        ...filterData,
        filters: newFilters,
      };
      setFilterData(newFilterData);
    }
   //  setSearchParams(newSearchParams, { replace: true });
  };

  const handleSort = (value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    handleReset(newSearchParams);
    newSearchParams.set("sort", value);
    setSearchParams(newSearchParams, { replace: true });
  };

  useEffect(() => {
    setLoading(true);
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;

    // If url is missing search params, set default search params
    if (!currentSearchParams.has("page")) {
      currentSearchParams.set("page", "1");
      needsUpdate = true;
    }

    if (!currentSearchParams.has("limit")) {
      currentSearchParams.set("limit", "12");
      needsUpdate = true;
    }

    if (currentSearchParams.has("q")) {
      setQuery(currentSearchParams.get("q"));
    }

    if (currentSearchParams.has("weight")) {
      setWeight(currentSearchParams.get("weight"));
    }

    if (currentSearchParams.has("length")) {
      setLength(currentSearchParams.get("length"));
    }

    if (currentSearchParams.has("depth")) {
      setDepth(currentSearchParams.get("depth"));
    }

    // When search params set, fetch data
    if (needsUpdate) {
      setSearchParams(currentSearchParams);
      needsUpdate = false;
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
      <Container className="py-5">
        <h1>{getTitle()}</h1>
        <FilterContainer
          data={filterData}
          type={type}
          query={query}
          onSearch={handleSearch}
          onSelect={handleChange}
          onClear={handleClear}
        />
        <ResultsContainer
          data={data}
          type={type}
          loading={loading}
          error={error}
          sorts={filterData}
          onSort={handleSort}
          query={query}
        />
      </Container>
    </PageContainer>
  );
};

export default Search;
