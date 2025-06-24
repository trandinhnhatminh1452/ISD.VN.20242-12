import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import "../../pages/ProductDetail/ProductDetail.scss";
import ProductList from "../../components/ProductList/ProductList";

const Products = () => {
  return (
    <>
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Trang chủ
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <span className="breadcrumb-current">Sản phẩm</span>
      </div>
      <ProductList />
    </>
  );
};

export default Products;
