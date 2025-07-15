import { useState, useEffect } from "react";

// From https://dev.to/codebayu/react-custom-hooks-usedebounce-4il9
const useDebounce = (value, delay) => {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(timer);
      };
   }, [value, delay]);

   return debouncedValue;
};

export { useDebounce };
