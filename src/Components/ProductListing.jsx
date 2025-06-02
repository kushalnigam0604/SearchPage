import React from "react";
import ProductCard from "./ProductCard";

const ProductListing = ({ data }) => {
  return (
    <div>
      <div className="productList">
        {data.map((item,index) => (
          <ProductCard productDetails={item} key={item?.id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
