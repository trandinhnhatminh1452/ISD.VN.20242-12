import { useCart } from "../../context/CartContext";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Để lấy params từ URL
import { FaAngleRight } from "react-icons/fa"; // Thêm biểu tượng giỏ hàng
import { productAPI } from "../../utils/api";
import "./BookDetail.scss";
import RecommendedBooks from "../../components/recommendedBook/recommendedBook";

const BookDetail = () => {
  const { bookId } = useParams(); // Lấy ID sách từ URL
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [recIndex, setRecIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch product basic info
        const productData = await productAPI.getProductById(bookId);
        setBook(productData);
        
        // Fetch product details (book details)
        try {
          const detailsData = await productAPI.getProductDetails(bookId);
          setBookDetails(detailsData);
        } catch (detailsError) {
          console.warn("No book details found:", detailsError);
          setBookDetails(null);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details. Please try again.");
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  useEffect(() => {
    if (!book) return;
    
    const fetchRelatedBooks = async () => {
      try {
        const relatedData = await productAPI.getRelatedProducts(bookId);
        setRecommended(relatedData);
      } catch (error) {
        console.error("Error fetching related books:", error);
        setRecommended([]);
      }
    };

    fetchRelatedBooks();
  }, [book, bookId]);

  // Helper to format price
  const formatPrice = (price) => {
    if (!price) return 999999;
    return price.toLocaleString("vi-VN");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev < book.quantity ? prev + 1 : prev;
      if (type === "dec") return prev > 1 ? prev - 1 : prev;
      return prev;
    });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...book, id: book.productId || book.id });
    }
  };

  const handleBuyNow = () => {
    const item = {
      id: book.id,
      name: book.title || "Không có tên",
      price: book.price || 0,
      quantity: quantity,
      image: book.imageUrl || "/placeholder-book.jpg"
    };
    navigate('/payment', { state: { cartItems: [item] } });
  };
  

  if (!book) {
    return <p className="loading">Đang tải thông tin sách...</p>;
  }

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
        <span className="breadcrumb-current">{book.title || "Không có tên"}</span>
      </div>
      <div className="book-detail">
        <div className="book-main">
          <div className="book-image">
            <img
              src={book.imageUrl || "/placeholder-book.jpg"}
              alt={book.title || "Không có tên"}
              onError={e => { e.target.src = "/placeholder-book.jpg"; }}
            />
          </div>
          <div className="book-info">
            <h2 className="book-title">{book.title || "Không có tên"}</h2>
            <p className="author">
              <strong>Tác giả:</strong> {bookDetails?.authors || "Không rõ"}
            </p>
            <p className="price">
              <span className="price-value">
                {formatPrice(book.price || 0)}
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
                  <span className="stock">Còn lại {book.quantity || 0} trong kho</span>
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
            </div>
          </div>
        </div>
        <div className="book-desc-section">
          <h3 className="desc-heading">Giới thiệu sách</h3>
          <div className="description">
            {book.description || "Không có mô tả"}
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

export default BookDetail;
