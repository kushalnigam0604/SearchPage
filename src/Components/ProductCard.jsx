import React from "react";

const ProductCard = ({ productDetails }) => {
  return (
    <div className="productCard">
      <div className="productImage">
        <img src={productDetails?.imageUrl} alt="" />
      </div>
      <div className="productDetail">
        <p>{productDetails?.name}</p>
        <p>
          <span
            className={
              productDetails?.msrp > productDetails?.price
                ? "msrpClass"
                : "priceClass"
            }
          >
            ${productDetails?.price}
          </span>{" "}
          {productDetails?.msrp > productDetails?.price
            ? "$" + productDetails?.msrp
            : null}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
