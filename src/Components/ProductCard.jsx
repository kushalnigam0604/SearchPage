import React from "react";

const ProductCard = ({ productDetails, index }) => {
  const loadingType = index < 4 ? "eager" : "lazy";

  return (
    <div className="productCard">
      <div className="productImage">
        <img
          src={productDetails?.imageUrl}
          alt={productDetails?.name}
          loading={loadingType}
        />
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
