import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import BookCard from "../BookCard/BookCard";
import { SearchContext } from "../../context/SearchContext";
import { productAPI } from "../../utils/api";
import "./BookList.scss";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(32);
  const { searchTerm } = useContext(SearchContext);
  const [query, setQuery] = useState(searchTerm || "");
  const [sortPrice, setSortPrice] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);

  const [filters, setFilters] = useState({
    all: true,
    book: {
      checked: false,
      genres: {
        fiction: false,
        nonfiction: false,
        science: false
      }
    },
    cd: {
      checked: false,
      genres: {
        pop: false,
        rock: false,
        jazz: false
      }
    },
    dvd: {
      checked: false,
      genres: {
        action: false,
        drama: false,
        comedy: false
      }
    },
    lp: {
      checked: false,
      genres: {
        classic: false,
        instrumental: false
      }
    }
  });

  useEffect(() => {
    setQuery(searchTerm.trim() === "" ? "" : searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const page = Math.floor(startIndex / maxResults);
        const response = await productAPI.getAllProducts(page, maxResults, query);
        console.log("Books from API (raw):", response.content);
        const fixedBooks = (response.content || []).map((book, idx) => {
          console.log("Book raw:", book);
          return {
            ...book,
            productId: book.productId || book.id || book.product_id || idx + 1
          };
        });
        setBooks(fixedBooks);
        setTotalItems(response.totalElements || 0);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again.");
        setBooks([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, startIndex, maxResults]);

  const getBookPrice = (book) =>
    typeof book.price === "number"
      ? book.price
      : 999999;

  const sortedBooks = useMemo(() => {
    let sorted = [...books];
    if (sortPrice === "asc") {
      sorted.sort((a, b) => getBookPrice(a) - getBookPrice(b));
    } else if (sortPrice === "desc") {
      sorted.sort((a, b) => getBookPrice(b) - getBookPrice(a));
    } else {
      sorted.sort((a, b) => {
        const titleA = (a.title || "").toLowerCase();
        const titleB = (b.title || "").toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
    }
    return sorted;
  }, [books, sortPrice]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setMaxResults(8);
      } else if (width < 900) {
        setMaxResults(20);
      } else {
        setMaxResults(27);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setStartIndex(0);
  }, [searchTerm]);

  const totalPages = Math.ceil(totalItems / maxResults);
  const currentPage = Math.floor(startIndex / maxResults) + 1;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((num) => (
      <button
        key={num}
        className={`pagination-page${num === currentPage ? " active" : ""}`}
        onClick={() => setStartIndex((num - 1) * maxResults)}
        disabled={num === currentPage}
      >
        {num}
      </button>
    ));
  };

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".book-card");
    if (!cards) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [sortedBooks]);

  // ---- FILTER HANDLERS ----
  const handleAllChange = (checked) => {
    setFilters((prev) => {
      const updated = { all: checked };
      ["book", "cd", "dvd", "lp"].forEach((key) => {
        updated[key] = {
          checked,
          genres: Object.fromEntries(
            Object.keys(prev[key].genres).map((g) => [g, checked])
          )
        };
      });
      return updated;
    });
  };

  const handleMainTypeChange = (type, checked) => {
    setFilters((prev) => ({
      ...prev,
      all: false,
      [type]: {
        checked,
        genres: Object.fromEntries(
          Object.keys(prev[type].genres).map((g) => [g, checked])
        )
      }
    }));
  };

  const handleGenreChange = (type, genre, checked) => {
    setFilters((prev) => ({
      ...prev,
      all: false,
      [type]: {
        ...prev[type],
        genres: {
          ...prev[type].genres,
          [genre]: checked
        }
      }
    }));
  };

  // ---- APPLY FILTER (DUMMY) ----
  const filteredBooks = useMemo(() => {
    // Hiện Google Books API không có loại CD/DVD nên tạm trả toàn bộ books
    return sortedBooks;
  }, [sortedBooks, filters]);

  return (
    <>
      <img src="/hinh-anh-cuon-sach-co-mo-ra_051457868.png" alt="Sách mở ra" />
      <div className="booklist-container">
        <div className="filter-sidebar">
          <h3>Lọc theo loại</h3>
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.all}
                onChange={(e) => handleAllChange(e.target.checked)}
              />
              Tất cả các sản phẩm
            </label>
            {["book", "cd", "dvd", "lp"].map((type) => (
              <div key={type} style={{ marginBottom: "0.5rem" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters[type].checked}
                    onChange={(e) =>
                      handleMainTypeChange(type, e.target.checked)
                    }
                  />
                  {type.toUpperCase()}
                </label>
                <div style={{ marginLeft: "1.5rem" }}>
                  {Object.entries(filters[type].genres).map(([genre, val]) => (
                    <label key={genre} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) =>
                          handleGenreChange(type, genre, e.target.checked)
                        }
                      />
                      {genre}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="booklist-main">
          <div className="booklist-toolbar">
            <label htmlFor="sort-price">Sắp xếp theo : </label>
            <select
              id="sort-price"
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              className="sort-select"
            >
              <option value="">Mặc định</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
          <div className="book-grid" ref={gridRef}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <BookCard key={book.productId || book.id || idx} book={book} index={idx} />
              ))
            ) : (
              <p>Không có sách phù hợp với tìm kiếm của bạn.</p>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={() =>
                setStartIndex((prev) => Math.max(prev - maxResults, 0))
              }
              disabled={currentPage === 1}
            >
              ←
            </button>
            {renderPageNumbers()}
            <button
              onClick={() =>
                setStartIndex((prev) =>
                  Math.min(prev + maxResults, (totalPages - 1) * maxResults)
                )
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;
