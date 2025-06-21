import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./recommendedBook.scss";
import formatPrice from "../../utils/formatPrice";

const BOOKS_PER_SLIDE = 5;

const RecommendedBooks = ({
  bookId,
  category,
  recIndex,
  setRecIndex,
  books: booksProp = [],
  title = "Có thể bạn cũng thích",
}) => {
  const [books, setBooks] = useState([]);
  const maxIndex = Math.max(0, books.length - BOOKS_PER_SLIDE);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/all?page=0&size=12`
        );
        const data = await response.json();
        const filtered = (data.content || []).filter(
          (b) => b.productId !== parseInt(bookId)
        );
        setBooks(filtered);
        setRecIndex(0);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm đề xuất:", error);
      }
    };

    if (bookId && category) {
      fetchRecommended();
    } else if (booksProp.length > 0) {
      setBooks(booksProp);
    }
  }, [bookId, category, booksProp, setRecIndex]);

  const handlePrev = () => setRecIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setRecIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <div className="recommend-section">
      <div className="recommend-header">
        <h3>{title}</h3>
        <Link to="/products">Xem thêm</Link>
      </div>
      <div className="recommend-slider">
        <button
          className="slider-arrow left"
          onClick={handlePrev}
          disabled={recIndex === 0}
        >
          &#8592;
        </button>
        <div className="recommend-list-wrapper">
          <div
            className="recommend-list"
            style={{
              transform: `translateX(-${recIndex * (100 / BOOKS_PER_SLIDE)}%)`,
              transition: "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)",
            }}
          >
            {books.map((b) => {
              const imageSrc = b.image
                ? `http://localhost:8080/image/${b.image}`
                : "/default-book-cover.jpg";
              const title = b.title || "Không rõ";
              const price = b.price != null ? b.price : 999999;

              return (
                <Link
                  to={`/product/${b.productId}`}
                  key={b.productId}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="recommend-item">
                    <img
                      src={imageSrc}
                      alt={title}
                      onError={(e) => {
                        e.target.src = "/default-book-cover.jpg";
                      }}
                    />
                    <div className="recommend-title">{title}</div>
                    <div className="recommend-prices">
                      <span className="recommend-price">
                        {formatPrice(price)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <button
          className="slider-arrow right"
          onClick={handleNext}
          disabled={recIndex === maxIndex}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default RecommendedBooks;
