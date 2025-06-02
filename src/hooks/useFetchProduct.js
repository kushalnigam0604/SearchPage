import { useState, useEffect } from "react";

const useFetchProduct = (query = "jeans", page, siteId) => {
  const [result, setResult] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const debounceTimerId = setTimeout(() => {
      const fetchProductList = async () => {
        setError(null);
        try {
          const res = await fetch(
            `https://api.searchspring.net/api/search/search.json?siteId=${siteId}&q=${encodeURIComponent(
              query
            )}&resultsFormat=native&page=${page}`
          );
          const data = await res.json();
          setResult(data?.results);
          setTotalPage(data?.pagination);
        } catch (err) {
          console.error("Error:", err);
          setError(err);
        }
      };

      fetchProductList();
    }, 1000); 

    return () => clearTimeout(debounceTimerId);
  }, [query, page, siteId]);

  return { result, totalPage, error };
};

export default useFetchProduct;
