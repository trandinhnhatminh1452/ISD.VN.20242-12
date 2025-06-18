// src/components/Navbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { SearchContext } from "../../context/SearchContext";
import { IoIosSearch } from "react-icons/io";
import "../../context/SearchContext.scss";
import "./NavBar.scss"; // Thêm file CSS cho Navbar
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { productAPI } from "../../utils/api";

const Navbar = () => {
  const { cart } = useCart(); // Lấy số lượng sách trong giỏ hàng từ CartContext
  const cartItemCount = cart.length; // Đếm số lượng sách trong giỏ hàng
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const [inputValue, setInputValue] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const searchResultsRef = useRef(null);

  const handleUserMenu = (e) => {
    e.preventDefault();
    setShowUserMenu(!showUserMenu);
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.user-menu-container') === null) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToResults = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = async (value) => {
    try {
      // Use real API for search suggestions
      const products = await productAPI.searchProducts(value);
      const suggestions = products.slice(0, 5).map(product => product.title);
      setSuggestions(products.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    }
  };

  const onInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(false);

    if (value.trim().length > 0) {
      try {
        // Use real API for search suggestions
        const products = await productAPI.searchProducts(value);
        const suggestions = products.slice(0, 5).map(product => product.title);
        setSuggestions(products.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.volumeInfo.title);
    setSearchTerm(suggestion.volumeInfo.title);
    setShowSuggestions(false);
    window.location.href = `/book/${suggestion.id}`;
  };

  return (
    <nav>
      <div className="search-results" ref={searchResultsRef}>
        {/* Phần này sẽ được cuộn đến khi tìm kiếm */}
      </div>
      <div className="navbar-left">
        <div className="shop">
          <Link to="/">
            <img src="/G12.png" alt="G12 Book Store Logo" />
          </Link>
        </div>

      </div>
      <div className="navbar-center">
        <ul>
        <li>
        <Link to="/">Trang chủ</Link>
        </li>
          <li>
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li>
            <Link to="/about">Về chúng tôi</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
          <li className="support-dropdown">
            <div className="dropdown-container" onMouseEnter={() => setShowSupportMenu(true)} onMouseLeave={() => setShowSupportMenu(false)}>
              <Link to="/support">Hỗ trợ</Link>
              {showSupportMenu && (
                <div className="support-menu">
                  <Link to="/customer-support/order-guide" className="menu-item">Hướng dẫn đặt hàng</Link>
                  <Link to="/customer-support/shipping-guide" className="menu-item">Hình thức vận chuyển</Link>
                  <Link to="/customer-support/payment-guide" className="menu-item">Hướng dẫn thanh toán</Link>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <form className="navbar-search" onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(inputValue);
            setShowSuggestions(false);
            scrollToResults();
          }}>
            <input
              className="search-input"
              type="text"
              placeholder="Tìm kiếm sách..."
              value={inputValue}
              onChange={onInputChange}
            />
            <button className="search-button" type="submit">
              <IoIosSearch />
            </button>
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.volumeInfo.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="user-menu-container" onClick={handleUserMenu}>
          <FaUser
            size={26}
            style={{
              marginLeft: "18px",
              verticalAlign: "middle",
              cursor: "pointer"
            }}
          />
          {showUserMenu && (
            <div className="user-menu">
              {user ? (
                <>
                  <Link to="/profile" className="menu-item">{user.username}</Link>
                  <button onClick={logout} className="menu-item">Đăng xuất</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="menu-item">Đăng nhập</Link>
                  <Link to="/register" className="menu-item">Đăng ký</Link>
                </>
              )}
            </div>
          )}
        </div>
        <Link
          to="/cart"
          className="cart-link"
          style={{
            position: "relative",
            display: "inline-block",
            marginLeft: "18px",
          }}
        >
          <FaShoppingCart size={26} />
          <span className="cart-badge">{cartItemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
