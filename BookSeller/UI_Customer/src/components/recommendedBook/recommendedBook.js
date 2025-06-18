import React from "react";
import { Link } from "react-router-dom";
import "./recommendedBook.scss";
import formatPrice from "../../utils/formatPrice";

const BOOKS_PER_SLIDE = 5;

const RecommendedBooks = ({ books, recIndex, setRecIndex, title = "Có thể bạn cũng thích" }) => {
  const maxIndex = Math.max(0, books.length - BOOKS_PER_SLIDE);
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
            {books.map((b) => (
              <Link
                to={`/book/${b.productId || b.id}`}
                key={b.productId || b.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="recommend-item">
                  <img
                    src={b.imageUrl || "/placeholder-book.jpg"}
                    alt={b.title || "Không có tên"}
                    onError={e => { e.target.src = "/placeholder-book.jpg"; }}
                  />
                  <div className="recommend-title">{b.title || "Không có tên"}</div>
                  <div className="recommend-prices">
                    <span className="recommend-price">
                      {formatPrice(b.price || 0)}₫
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
