import { useState, useEffect } from "react";

const useFetchProduct = (query, page, siteId) => {
  const [result, setResult] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }
    const fetchProductList = async () => {
      setError(null);
      try {
        const res =
          await fetch(`http://api.searchspring.net/api/search/search.json?siteId=${siteId}&q=${encodeURIComponent(
            query
          )}&resultsFormat=native&page=${page}
                  `);
        const data = await res.json();
        setResult(data?.results);
        setTotalPage(data?.pagination);
      } catch (err) {
        console.error("Error : ", err);
        setError(err);
      }
    };
    fetchProductList();
  }, [query, page, siteId]);
  return { result, totalPage, error };
};
export default useFetchProduct;
