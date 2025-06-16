import { useCart } from "../../context/CartContext";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./ProductDetail.scss";
import RecommendedBooks from "../../components/recommendedBook/recommendedBook";

const ProductDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState("");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [recommended, setRecommended] = useState([]);
  const [recIndex, setRecIndex] = useState(0);
  const navigate = useNavigate();

  const { user } = useAuth(); // Kiểm tra đăng nhập
  const stock = book?.quantity || 0;

  useEffect(() => {
    if (!bookId || bookId === "undefined") return;

    const fetchBookDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${bookId}`
        );
        const data = await response.json();
        setBook(data);

        if (data.productDetailBook?.authors) {
          setAuthor(data.productDetailBook.authors);
        } else {
          const creatorResponse = await fetch(
            `http://localhost:8080/api/product/creator/${bookId}`
          );
          if (creatorResponse.ok) {
            const creatorData = await creatorResponse.text();
            const cleanedAuthor = creatorData.replace(
              /^(Nghệ sĩ|Tác giả|Đạo diễn):\s*/i,
              ""
            );
            setAuthor(cleanedAuthor);
          }
        }
      } catch (error) {
        console.error("Error fetching book detail:", error);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  useEffect(() => {
    if (!book) return;

    const fetchRecommended = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/all?query=${encodeURIComponent(
            book.category || ""
          )}&page=0&size=12`
        );
        const data = await response.json();
        setRecommended(
          (data.content || []).filter((b) => b.productId !== parseInt(bookId))
        );
        setRecIndex(0);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };

    fetchRecommended();
  }, [book, bookId]);

  const formatPrice = (price) => {
    if (!price) return 999999;
    return price.toLocaleString("vi-VN");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev < stock ? prev + 1 : prev;
      if (type === "dec") return prev > 1 ? prev - 1 : prev;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }

    addToCart({
      ...book,
      quantity: quantity,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để mua sản phẩm.");
      navigate("/login");
      return;
    }

    const item = {
      id: book.productId,
      name: book.title,
      price: book.price || 999999,
      quantity: quantity,
      image: book.image,
    };
    navigate("/payment", { state: { cartItems: [item] } });
  };

  if (!book) return <p className="loading">Đang tải thông tin sách...</p>;

  return (
    <>
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Trang chủ
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <Link to="/products" className="breadcrumb-next">
          Sản phẩm
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <span className="breadcrumb-current">
          {book?.title || "Đang tải..."}
        </span>
      </div>

      <div className="book-detail">
        <div className="book-main">
          <div className="book-info">
            <h2 className="book-title">{book?.title || "Đang tải..."}</h2>
            <p className="author">
              <strong>Tác giả:</strong> {author || "Đang tải..."}
            </p>
            <p className="price">
              <span className="price-value">
                {formatPrice(book?.price)}
                <span className="currency">₫</span>
              </span>
            </p>
            <div className="purchase-section">
              <div className="quantity-stock">
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="qty-btn"
                  >
                    +
                  </button>
                  <span className="stock">Còn lại {stock} trong kho</span>
                </div>
              </div>
              <div className="purchase-buttons">
                <button
                  className="add-to-cart-outline"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="buy-now" onClick={handleBuyNow}>
                  Mua ngay
                </button>
              </div>
              {!user && (
                <p className="login-warning">
                  * Vui lòng đăng nhập để mua hàng
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="book-desc-section">
          <h3 className="desc-heading">Giới thiệu sách</h3>
          <div className="description">
            {book?.description || "Không có mô tả"}
          </div>
        </div>

        <RecommendedBooks
          books={recommended}
          recIndex={recIndex}
          setRecIndex={setRecIndex}
        />
      </div>
    </>
  );
};

export default ProductDetail;
