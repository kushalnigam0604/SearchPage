import React from "react";
import ProductCard from "./ProductCard";

const ProductListing = ({ data }) => {
  return (
    <div>
      <div className="productList">
        {data.map((item) => (
          <ProductCard productDetails={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
