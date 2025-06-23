import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productAPI } from "../../utils/api";
import "./Home.scss";
import RecommendedBooks from "../../components/recommendedBook/recommendedBook";

const Home = () => {
  const [members, setMembers] = useState([]);
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [products, setProducts] = useState([]);
  const [recIndex, setRecIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If bookId is provided, fetch that specific book
    if (bookId) {
      const fetchBookDetail = async () => {
        setLoading(true);
        try {
          const productData = await productAPI.getProductById(bookId);
          setBook(productData);
        } catch (error) {
          console.error("Error fetching book:", error);
          setBook(null);
        } finally {
          setLoading(false);
        }
      };
      fetchBookDetail();
    }
  }, [bookId]);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Get first page of products as featured products
        const response = await productAPI.getAllProducts(0, 20);
        setProducts(response.content || []);
        setRecIndex(0);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProducts([]);
      }
    };

    fetchFeaturedProducts();

    setMembers([
      {
        id: 1,
        name: "Dương Tuấn Nghĩa",
        image: "/member/Screenshot 2025-05-29 222210.png",
      },
      {
        id: 2,
        name: "Bùi Việt Hưng",
        image: "/member/Screenshot 2025-05-29 152846.png",
      },
      {
        id: 3,
        name: "Trần Đình Nhật Minh",
        image: "/member/Screenshot 2025-05-29 222108.png",
      },
      {
        id: 4,
        name: "Đặng Thành Tựu",
        image: "/member/placeholder.jpg",
      },
      {
        id: 5,
        name: "Bùi Quang Tùng",
        image: "/member/placeholder.jpg",
      },
    ]);
  }, []);

  // Slider navigation

  if (loading) {
    return <p className="loading">Đang tải thông tin sách...</p>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Chào mừng đến với G12 Shop</h1>
          <h2>Tìm kiếm cuốn sách yêu thích của bạn</h2>
          <p>Khám phá kho sách đa dạng từ các tác giả hàng đầu</p>
          <Link to="/products" className="cta-button">
            Mua ngay
          </Link>
        </div>
      </div>

      {/* Member Profiles Section */}
      <section className="member-section">
        <div className="member-container">
          <div className="title-border">
            <Link to="/about" className="title-module">
              <h2>Thành viên nhóm</h2>
            </Link>
          </div>
          <div className="member-grid">
            {members.map((member) => (
              <div key={member.id} className="member-card">
                <img src={member.image} alt={member.name} className="image-200" />
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Books Section */}
      <RecommendedBooks
  books={products}
  recIndex={recIndex}
  setRecIndex={setRecIndex}
  title="Sản phẩm của chúng tôi"
/>
    </div>
  );
};

export default Home;
