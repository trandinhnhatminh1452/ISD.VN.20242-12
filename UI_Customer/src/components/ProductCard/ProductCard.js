// src/components/ProductCard/ProductCard.js
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import "./ProductCard.scss";

// Hàm định dạng giá tiền với dấu phân cách
const formatPrice = (price) => {
  if (!price) return 999999;
  return new Intl.NumberFormat("vi-VN").format(price);
};

const ProductCard = ({ book }) => {
  console.log("🪪 productId trong ProductCard:", book.productId);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const price = book.price || 999999;
  const title = book.title || "No title";
  const image = book.image || "/default-book-cover.jpg";

  const bookToAdd = {
    ...book,
    productId: book.productId,
    quantity: 1,
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("accessToken"); // kiểm tra token
    if (!token) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }

    addToCart(bookToAdd); // thêm vào giỏ hàng nếu đã đăng nhập
  };

  return (
    <div className="book-card">
      <Link
        to={`/product/${book.productId}`}
        onClick={() =>
          console.log("➡️ Chuyển đến:", `/product/${book.productId}`)
        }
      >
        <img src={image} alt={title} />
      </Link>
      <div className="book-details">
        <h3>{title}</h3>
        <div className="price-cart">
          <p className="price">{formatPrice(price)} VND</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
