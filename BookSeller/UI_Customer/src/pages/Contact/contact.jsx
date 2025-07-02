import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAngleRight,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "../../pages/ProductDetail/ProductDetail.scss";
import "./contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      content: "",
    });
  };
  return (
    <>
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Trang chủ
        </Link>
        <FaAngleRight className="breadcrumb-sep" />
        <span className="breadcrumb-current">Liên hệ</span>
      </div>

      <div className="google-map-container">
        <iframe
          title="Bản đồ Đại học Bách Khoa Hà Nội"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6619654527303!2d105.84055577514037!3d21.006183180637464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac71294bf0ab%3A0xc7e2d20e5e04a9da!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1751076476640!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <div className="icon-container">
              <FaMapMarkerAlt size={20} />
            </div>
            <div className="content">
              <h1>Địa chỉ:</h1>
              <p>Số 1, Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội.</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-container">
              <FaEnvelope size={20} />
            </div>
            <div className="content">
              <h1>Gửi thắc mắc:</h1>
              <p>G12@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon-container">
              <FaPhone size={20} />
            </div>
            <div className="content">
              <h1>Điện thoại:</h1>
              <p>02435146876</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
