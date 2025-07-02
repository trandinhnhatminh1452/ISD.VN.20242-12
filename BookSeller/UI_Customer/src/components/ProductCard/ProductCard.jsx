// src/components/ProductCard/ProductCard.js
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./ProductCard.scss";

// Hàm định dạng giá tiền với dấu phân cách
const formatPrice = (price) => {
  if (!price) return 999999;
  return new Intl.NumberFormat("vi-VN").format(price);
};

const ProductCard = ({ book }) => {
  console.log("🪪 productId trong ProductCard:", book.productId);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const price = book.price || 999999;
  const title = book.title || "No title";
  const image = book.image
    ? `http://localhost:8080/image/${book.image}`
    : "/default-book-cover.jpg";

  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        id: book.productId || book.id,
        productId: book.productId || book.id,
        quantity,
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  return (
    console.log("🖼️ Book object:", book),
    (
      <div className="book-card">
        <Link to={`/product/${book.productId}`}>
          <img src={image} alt={title} />
        </Link>
        <div className="book-details">
          <Link to={`/product/${book.productId}`}>
            <h3>{title}</h3>
          </Link>

          <div className="price-cart">
            <p className="price">{formatPrice(price)} VND</p>
            <button className="add-to-cart" onClick={handleAddToCart}>
              <FaCartPlus />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
