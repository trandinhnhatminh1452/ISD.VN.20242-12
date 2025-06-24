import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import BookCard from "../ProductCard/ProductCard";
import { SearchContext } from "../../context/SearchContext";
import "./ProductList.scss";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // pageNumber bắt đầu từ 0
  const [maxResults, setMaxResults] = useState(10); // pageSize mặc định
  const { searchTerm } = useContext(SearchContext);
  const [query, setQuery] = useState(searchTerm || "");
  const [sortPrice, setSortPrice] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const gridRef = useRef(null);

  // Bộ lọc
  const [filters, setFilters] = useState({
    all: true
  });

  // Lấy danh sách category từ API
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product/categories');
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý lọc theo category
  const handleCategoryFilter = (category) => {
    const newFilters = { ...filters };
    if (category === 'all') {
      // Khi chọn "Tất cả sản phẩm", uncheck tất cả category khác
      newFilters.all = true;
      categories.forEach(cat => {
        if (cat !== 'all') {
          newFilters[cat] = { checked: false };
        }
      });
    } else {
      // Khi chọn category cụ thể, uncheck "Tất cả sản phẩm"
      newFilters.all = false;
      newFilters[category] = { checked: true };
      // Uncheck tất cả category khác
      categories.forEach(cat => {
        if (cat !== category && cat !== 'all') {
          newFilters[cat] = { checked: false };
        }
      });
    }
    setFilters(newFilters);
    setStartIndex(0);
  };

  useEffect(() => {
    setQuery(searchTerm.trim());
    setStartIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Nếu chọn "Tất cả sản phẩm" hoặc không có category nào được chọn
        const shouldShowAll = filters.all || Object.values(filters).every(f => !f.checked);
        
        const response = await fetch(
          `http://localhost:8080/api/product/all?query=${query}&page=${startIndex}&size=${maxResults}${shouldShowAll ? '' : `&category=${Object.entries(filters).find(([k, v]) => k !== 'all' && v.checked)?.[0]}`}`
        );
        const data = await response.json();
      
        if (data && data.content) {
          setBooks(data.content);
          setTotalPages(data.totalPages || 1);
        } else {
          setBooks(data || []);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setBooks([]);
        setTotalPages(1);
      }
    };

    fetchProducts();
  }, [query, startIndex, maxResults, filters, categories]);

  const getBookPrice = (book) => typeof book.price === "number" ? book.price : 999999;

  const sortedBooks = useMemo(() => {
    let sorted = [...books];
    if (sortPrice === "asc") {
      sorted.sort((a, b) => getBookPrice(a) - getBookPrice(b));
    } else if (sortPrice === "desc") {
      sorted.sort((a, b) => getBookPrice(b) - getBookPrice(a));
    } else {
      sorted.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
    }
    return sorted;
  }, [books, sortPrice]);

  // Resize logic giữ nguyên (điều chỉnh maxResults)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setMaxResults(8);
      else if (width < 900) setMaxResults(20);
      else setMaxResults(27);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination
  const currentPage = startIndex + 1;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Giới hạn hiện 10 trang hoặc tổng số trang nhỏ hơn 10
    const maxPages = Math.min(10, totalPages);
    for (let i = 1; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((num) => (
      <button
        key={`page-${num}`}
        className={`pagination-page${num === currentPage ? " active" : ""}`}
        onClick={() => setStartIndex(num - 1)}
        disabled={num === currentPage}
      >
        {num}
      </button>
    ));
  };

  // Animation IntersectionObserver giữ nguyên
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
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => {
                    const updated = { all: checked };
                    categories.forEach((category) => {
                      updated[category] = {
                        checked,
                        genres: {}
                      };
                    });
                    return updated;
                  });
                }}
              />
              Tất cả các sản phẩm
            </label>
            
            {categories.map((category) => (
              <div key={`category-${category}`} className="category-item">
                <label>
                  <input
                    type="checkbox"
                    checked={filters[category]?.checked || false}
                    onChange={(e) => handleCategoryFilter(category)}
                  />
                  {category.toUpperCase()}
                </label>
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
              <option value="asc">Giá thấp đến cao</option>
              <option value="desc">Giá cao đến thấp</option>
            </select>
          </div>
          <div className="books-grid" ref={gridRef}>
            {sortedBooks.map((book) => (
              <BookCard
                key={book.productId}
                book={book}
              />
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
              disabled={startIndex === 0}
              className="pagination-button"
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setStartIndex(Math.min(totalPages - 1, startIndex + 1))}
              disabled={startIndex === totalPages - 1}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
