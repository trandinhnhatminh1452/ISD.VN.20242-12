import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import "./shipping-guide.scss";

const ShippingGuide = () => {
  return (
    <div className="shipping-guide-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Trang chủ
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <Link to="/support" className="breadcrumb-next">
          Hỗ trợ
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <span className="breadcrumb-current">Hình thức vận chuyển</span>
      </div>
      <h1>Hình thức vận chuyển</h1>

      <div className="guide-content">
        <div className="guide-section">
          <h2>Hình thức vận chuyển</h2>
          <p>G12Shop áp dụng hình thức vận chuyển đơn hàng như sau:</p>
          <div className="subsection">
            <h3>Phí vận chuyển</h3>
            <ul>
              <li>Vận chuyển thường( 3-7 ngày): phí vận chuyển 50.000đ</li>
              <li>Vận chuyển nhanh(1-3 ngày): phí vận chuyển 100.000đ</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>Thời gian giao hàng</h3>
            <ul>
              <li>Tất cả các đơn hàng đều được giao trực tiếp tại địa chỉ của Khách hàng.</li>
              <li>Thời gian giao hàng tối đa là 3 ngày làm việc.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingGuide;
