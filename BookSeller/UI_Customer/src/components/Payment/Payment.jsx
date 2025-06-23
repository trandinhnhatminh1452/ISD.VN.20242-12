import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Radio, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import './Payment.css';
import { orderAPI } from '../../utils/api';

const Payment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingType, setShippingType] = useState('normal');
  const [loading, setLoading] = useState(false);

  // Lấy sản phẩm trong giỏ hàng
  const cartItems = location.state?.cartItems || [];
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = shippingType === 'rush' ? 100000 : 50000;
  const vatFee = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + deliveryFee + vatFee;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Debug: Log cartItems để kiểm tra
      console.log("Cart items:", cartItems);
      
      // Chuẩn bị dữ liệu gửi lên backend
      const orderData = {
        name: values.customer_name,
        email: values.customer_email,
        phone: values.customer_phone,
        address: values.customer_address,
        provinceCity: values.province_city,
        totalPrice: subtotal,
        deliveryFee: deliveryFee,
        vatFee: vatFee,
        finalAmount: totalAmount,
        status: 'CREATED',
        userId: user?.userId,
        orderItems: cartItems.map(item => {
          const productId = item.productId || item.id;
          if (!productId) {
            throw new Error(`ProductId is missing for item: ${JSON.stringify(item)}`);
          }
          return {
            productId: productId,
            quantity: item.quantity,
            price: item.price
          };
        }),
        paymentMethod: paymentMethod
      };
      
      console.log("Order data being sent:", orderData);
      const response = await orderAPI.createOrder(orderData);
      message.success('Đặt hàng thành công!');
      navigate(`/invoice/${response.orderId}`, { state: { paymentMethod: paymentMethod } });
    } catch (error) {
      console.error("Payment error:", error);
      message.error('Thanh toán thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <h1>Thanh Toán</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <div className="payment-section">
            <h2>Thông Tin Giao Hàng</h2>
            <Form.Item
              name="customer_name"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              name="customer_phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="customer_email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="customer_address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ giao hàng" />
            </Form.Item>

            <Form.Item
              name="province_city"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <select style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
                <option value="">-- Chọn tỉnh/thành phố --</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Bắc Kạn">Bắc Kạn</option>
                <option value="Bạc Liêu">Bạc Liêu</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bến Tre">Bến Tre</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Bình Phước">Bình Phước</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Cà Mau">Cà Mau</option>
                <option value="Cao Bằng">Cao Bằng</option>
                <option value="Đắk Lắk">Đắk Lắk</option>
                <option value="Đắk Nông">Đắk Nông</option>
                <option value="Điện Biên">Điện Biên</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Đồng Tháp">Đồng Tháp</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hà Giang">Hà Giang</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Hải Dương">Hải Dương</option>
                <option value="Hậu Giang">Hậu Giang</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Khánh Hòa">Khánh Hòa</option>
                <option value="Kiên Giang">Kiên Giang</option>
                <option value="Kon Tum">Kon Tum</option>
                <option value="Lai Châu">Lai Châu</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
                <option value="Lào Cai">Lào Cai</option>
                <option value="Long An">Long An</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Nghệ An">Nghệ An</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Bình">Quảng Bình</option>
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Quảng Trị">Quảng Trị</option>
                <option value="Sóc Trăng">Sóc Trăng</option>
                <option value="Sơn La">Sơn La</option>
                <option value="Tây Ninh">Tây Ninh</option>
                <option value="Thái Bình">Thái Bình</option>
                <option value="Thái Nguyên">Thái Nguyên</option>
                <option value="Thanh Hóa">Thanh Hóa</option>
                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                <option value="Tiền Giang">Tiền Giang</option>
                <option value="Trà Vinh">Trà Vinh</option>
                <option value="Tuyên Quang">Tuyên Quang</option>
                <option value="Vĩnh Long">Vĩnh Long</option>
                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                <option value="Yên Bái">Yên Bái</option>
              </select>
            </Form.Item>

            <Form.Item name="notes" label="Ghi chú">
              <Input.TextArea placeholder="Nhập ghi chú (không bắt buộc)" />
            </Form.Item>
          </div>

          <div className="payment-section">
            <h2>Phương Thức Thanh Toán</h2>
            <Form.Item name="payment_method" initialValue="cod">
              <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                <Radio value="vnpay">Thanh toán qua VNPay</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="payment-section">
            <h2>Chọn loại giao hàng</h2>
            <Form.Item name="shipping_type" initialValue="normal">
              <Radio.Group onChange={(e) => setShippingType(e.target.value)}>
                <Radio value="normal">Giao hàng thường (50.000đ)</Radio>
                <Radio value="rush">Giao hàng nhanh (100.000đ)</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="payment-summary">
            <h2>Tổng Thanh Toán</h2>
            <div className="summary-item">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="summary-item">
              <span>Phí vận chuyển:</span>
              <span>{deliveryFee.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="summary-item">
              <span>VAT (5%):</span>
              <span>{vatFee.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="summary-item total">
              <span>Tổng cộng:</span>
              <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="payment-button"
            >
              Đặt Hàng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Payment; 