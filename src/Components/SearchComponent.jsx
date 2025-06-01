import React, { useMemo, useState } from "react";
import useFetchProduct from "../hooks/useFetchProduct";
import ProductListing from "./ProductListing";

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("jeans");
  const [page, setPage] = useState(1);
  const siteId = "scmq7n";
  const { result, totalPage, error } = useFetchProduct(query, page, siteId);

  const [sortOrder, setSortOrder] = useState("");

  const sortedResult = useMemo(() => {
    if (!result) return [];
    if (sortOrder === "low")
      return result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high")
      return result.sort((a, b) => b.price - a.price);
    return result;
  }, [result, sortOrder]);

  function handleSubmit() {
    setPage(1);
    setQuery(input);
  }
  const handlePage = (str) => {
    str === "next" ? setPage((page) => page + 1) : setPage((page) => page - 1);
  };
  return (
    <>
      <div className="navbar">
        <div className="searchComponent">
          <input
            type="text"
            value={input}
            placeholder='Search'
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        <div className="buttonHandle">
          <button
            onClick={() => handlePage("prev")}
            disabled={totalPage?.previousPage === 0}
          >
            prev
          </button>
          <span>Page</span>
          <button
            onClick={() => handlePage("next")}
            disabled={totalPage?.nextPage === 0}
          >
            next
          </button>
        </div>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {sortedResult ? <ProductListing data={sortedResult} /> : null}
    </>
  );
};

export default SearchComponent;
