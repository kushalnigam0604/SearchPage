import React, { useMemo, useState } from "react";
import useFetchProduct from "../hooks/useFetchProduct";
import ProductListing from "./ProductListing";

const SearchComponent = () => {
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const siteId = "scmq7n";
  const { result, totalPage, error } = useFetchProduct(query, page, siteId);

  const [sortOrder, setSortOrder] = useState("");

  const sortedResult = useMemo(() => {
    if (!result) return [];
    
    const resultCopy = [...result];
  
    if (sortOrder === "low") return resultCopy.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") return resultCopy.sort((a, b) => b.price - a.price);
    
    return resultCopy;
  }, [result, sortOrder]);
  

  function handleSubmit() {
    setPage(1);
    setQuery(query);
  }

  const prevThreeNo = Array.from({ length: 2 }, (_, index) => {
    return page - 1 - index;
  })
    .filter((value) => value > 0)
    .reverse();

  const nextThreeNo = Array.from({ length: 2 }, (_, index) => {
    const nextPage = page + index;
    return nextPage <= totalPage?.totalPages ? nextPage : null;
  }).filter(Boolean);

  const paginationArray = [...prevThreeNo, ...nextThreeNo];

  const handlePage = (str) => {
    str === "next" ? setPage((page) => page + 1) : setPage((page) => page - 1);
  };
  return (
    <>
      <div className="navbar">
        <div className="searchComponent">
          <input
            type="text"
            value={query ?? ""}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
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
          {paginationArray.map((item, index) => {
            return (
              <div
                key={index}
                className={item === page ? "active pg-btn" : "pg-btn"}
                onClick={() => setPage(item)}
              >
                {item}
              </div>
            );
          })}
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
