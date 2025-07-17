import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { capitalizeEachWord, getDistribution } from "../../utils/functions";
import "./search-filter.css";

const FilterContainer = ({ data, query, onSearch, onSelect, type }) => {
   const getUnit = (key) => {
      switch (key) {
         case "length":
            return "cm";
         case "weight":
            return "kg";
         default:
            return "m";
      }
   };

   return (
      <Container className="mb-3 m-0 p-0">
         <Form className="d-flex flex-column gap-2" onSubmit={(event) => event.preventDefault()}>
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
               {data && data.filters && data.filters.length > 0 &&
                  data.filters.map((filter) => {
                     return (
                        <Form.Group key={`filter-${filter.key}`}>
                           <Form.Label>
                              {capitalizeEachWord(filter.key)}
                           </Form.Label>
                           <Form.Select
                              className="filter-select"
                              size="sm"
                              value={filter.value}
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
            {data && data.ranges && data.ranges.length > 0 && (
               <fieldset className="ranges d-flex flex-wrap gap-3">
                  {data.ranges.map((range, index) => {
                     return (
                        <Form.Group
                           key={`range-${range.key}`}
                           className="position-relative"
                        >
                           <Form.Label>{`Max ${capitalizeEachWord(range.key)}`}</Form.Label>
                           <Form.Range
                              value={range.value}
                              min={range.min}
                              max={range.max}
                              onChange={(event) =>
                                 onSelect(range.key, event.target.value)
                              }
                           />
                           <div className="range-numbers w-100 d-flex justify-content-between">
                              <span>{`${range.min} ${getUnit(range.key)}`}</span>
                              <span>{`${range.max} ${getUnit(range.key)}`}</span>
                           </div>
                        </Form.Group>
                     );
                  })}
               </fieldset>
            )}
         </Form>
      </Container>
   );
};

export default FilterContainer;
