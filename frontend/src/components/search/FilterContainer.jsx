import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { capitalizeEachWord, getDistribution } from "../../utils/functions";
import "./search-filter.css";

const FilterContainer = ({ data, query, onSearch, onSelect, type }) => {
   // const [data, setData] = useState(null);
   // const [currRanges, setCurrRanges] = useState(null);

   // const handleSelect = (key, value, index) => {
   //    onSelect(key, value);

   //    const ranges = currRanges.map((range) => {
   //       if (range.key === key) {
   //          range.value = value;
   //       }
   //    });
   //    setCurrRanges(ranges);
   // }

   return (
      <Container className="mb-3 m-0 p-0">
         <Form className="d-flex flex-column gap-2">
            {/* Search */}
            <Form.Group className="" controlId="search">
               <Form.Control
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => onSearch(event.target.value)}
               />
            </Form.Group>

            {/* Filters */}
            <fieldset className="filters d-flex flex-wrap gap-3">
               {data &&
                  data.filters.map((filter) => {
                     return (
                        <Form.Group key={`filter-${filter.key}`}>
                           <Form.Label>
                              {capitalizeEachWord(filter.key)}
                           </Form.Label>
                           <Form.Select
                              size="sm"
                              onChange={(event) =>
                                 onSelect(filter.key, event.target.value)
                              }
                           >
                              {filter.options.map((option) => {
                                 if (filter.key === "distribution") {
                                    return (
                                       <option
                                          key={`${filter.key}-${option}`}
                                          value={option}
                                       >
                                          {getDistribution(option)}
                                       </option>
                                    );
                                 } else {
                                    return (
                                       <option
                                          key={`${filter.key}-${option}`}
                                          value={option}
                                       >
                                          {capitalizeEachWord(option)}
                                       </option>
                                    );
                                 }
                              })}
                           </Form.Select>
                        </Form.Group>
                     );
                  })}
            </fieldset>

            {/* Sliders */}
            <fieldset className="ranges d-flex flex-wrap gap-3 justify-content-around">
               {data &&
                  data.ranges.map((range, index) => {
                     return (
                        <Form.Group
                           key={`range-${range.key}`}
                           className="position-relative"
                        >
                           <Form.Label>{`Max ${capitalizeEachWord(range.key)}`}</Form.Label>
                           {/* <Form.Label>{`Max ${capitalizeEachWord(range.key)}: ${currRanges[index].value} m`}</Form.Label> */}
                           <Form.Range
                              defaultValue={range.min}
                              min={range.min}
                              max={range.max}
                              onChange={(event) =>
                                 onSelect(range.key, event.target.value)
                              }
                           />
                           {/* {currRanges && (
                              <span 
                              className="current-range"
                              style={{left: `calc(4px + 1% * ${currRanges[index].value / range.max})`}}>
                                 {currRanges[index].value}
                              </span>
                           )} */}
                           <div className="range-numbers w-100 d-flex justify-content-between">
                              <span>{`${range.min} m`}</span>
                              <span>{`${range.max} m`}</span>
                           </div>
                        </Form.Group>
                     );
                  })}
            </fieldset>
         </Form>
      </Container>
   );
};

export default FilterContainer;
