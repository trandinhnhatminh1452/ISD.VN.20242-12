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
  const [recIndex, setRecIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const stock = book?.quantity || 0;

  // Reset index khi đổi sản phẩm
  useEffect(() => {
    setRecIndex(0);
  }, [bookId]);

  // Lấy chi tiết sản phẩm
  useEffect(() => {
    if (!bookId || bookId === "undefined") return;

    const fetchBookDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${bookId}`
        );
        const data = await response.json();
        setBook(data);
        console.log("Dữ liệu book:", data);

        // Xác định tác giả/nghệ sĩ/đạo diễn tùy loại
        if (data.category === "Book" && data.productDetailBook?.authors) {
          setAuthor(data.productDetailBook.authors);
        } else if (data.category === "CD" && data.productDetailCD?.artists) {
          setAuthor(data.productDetailCD.artists);
        } else if (
          data.category === "DVD" &&
          data.productDetailDVD?.directors
        ) {
          setAuthor(data.productDetailDVD.directors);
        } else if (data.category === "LP" && data.productDetailLP?.artists) {
          setAuthor(data.productDetailLP.artists);
        } else {
          const creatorResponse = await fetch(
            `http://localhost:8080/api/product/creator/${bookId}`
          );
          if (creatorResponse.ok) {
            const creatorData = await creatorResponse.text();
            const cleaned = creatorData.replace(
              /^(Nghệ sĩ|Tác giả|Đạo diễn):\s*/i,
              ""
            );
            setAuthor(cleaned);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin sản phẩm:", error);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  const formatPrice = (price) => {
    if (price == null) return "999.999";
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

    try {
      addToCart({ ...book, quantity });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để mua sản phẩm.");
      navigate("/login");
      return;
    }

    if (!book) {
      alert("Đang tải thông tin sản phẩm. Vui lòng thử lại sau.");
      return;
    }

    const item = {
      id: book?.productId || "",
      name: book?.title || "",
      price: book?.price || 999999,
      quantity,
      image: book?.image || "default-book-cover.jpg",
    };
    navigate("/payment", { state: { cartItems: [item] } });
  };

  if (!book) return <p className="loading">Đang tải thông tin sản phẩm...</p>;

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
          <div className="book-image">
            <img
              src={`http://localhost:8080/image/${
                book?.image || "default-book-cover.jpg"
              }`}
              alt={book?.title || "Ảnh sản phẩm"}
              onError={(e) => (e.target.src = "/default-book-cover.jpg")}
            />
          </div>

          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <p className="author">
              <strong>
                {book.category === "CD" || book.category === "LP"
                  ? "Nghệ sĩ"
                  : book.category === "DVD"
                  ? "Đạo diễn"
                  : "Tác giả"}
                :
              </strong>{" "}
              {author || "Đang tải..."}
            </p>
            <p className="price">
              <span className="price-value">
                {formatPrice(book.price)}
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
          <h3 className="desc-heading">Giới thiệu sản phẩm</h3>
          <div className="description">
            {book.description || "Không có mô tả"}
          </div>
        </div>


        <div className="recommended-section">
          {book && (
            <RecommendedBooks
              bookId={book.productId}
              category={book.category}
              recIndex={recIndex}
              setRecIndex={setRecIndex}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
