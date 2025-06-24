import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Home.scss";
import RecommendedBooks from "../../components/recommendedBook/recommendedBook";

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const Home = () => {
  const [members, setMembers] = useState([]);
  const { bookId } = useParams(); // Lấy ID sách từ URL
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = React.useState([]);
  const [recIndex, setRecIndex] = useState(0);

  // Fetch featured products
  React.useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/all?page=0&size=12`
        );
        const data = await response.json();
        setProducts(data.content || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Fetch categories
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/categories`
        );
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
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
        image: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        id: 5,
        name: "Bùi Quang Tùng",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ]);
  }, []);

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
