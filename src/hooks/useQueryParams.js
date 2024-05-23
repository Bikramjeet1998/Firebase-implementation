import { useEffect, useState } from 'react';

function useQueryParams() {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    // Parse the query parameters from the current URL
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};

    // Iterate through the query parameters and store them in an object
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    setQueryParams(params);

    // Update the query parameters whenever the URL changes
    const handleRouteChange = () => {
      const updatedSearchParams = new URLSearchParams(window.location.search);
      const updatedParams = {};

      for (const [key, value] of updatedSearchParams.entries()) {
        updatedParams[key] = value;
      }

      setQueryParams(updatedParams);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return queryParams;
}

export default useQueryParams;
