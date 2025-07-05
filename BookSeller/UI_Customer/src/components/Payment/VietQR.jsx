import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, message, Card, Typography, Divider, Space } from 'antd';
import { QrcodeOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import './VietQR.css';

const { Title, Text, Paragraph } = Typography;

const VietQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copiedField, setCopiedField] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const { orderData, totalAmount, orderId } = location.state || {};

  const bankInfo = {
    bankCode: 'MB', // viết tắt ngân hàng
    accountNumber: '0345929208',
    accountName: 'BUI VIET HUNG',
    content: `HOADON${orderId || 'ORDER'}`,
    amount: totalAmount || 0
  };

  useEffect(() => {
    if (bankInfo.accountNumber && bankInfo.amount > 0) {
      const encodedContent = encodeURIComponent(bankInfo.content);
      const qrURL = `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber}-compact.png?amount=${bankInfo.amount}&addInfo=${encodedContent}`;
      setQrCodeUrl(qrURL);
    }
  }, [bankInfo]);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      message.success('Đã sao chép vào clipboard!');
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  const handleComplete = () => {
    message.success('Cảm ơn bạn đã thanh toán! Chúng tôi sẽ xác nhận đơn hàng sớm nhất.');
    navigate(`/invoice/${orderId}`, { 
      state: { 
        paymentMethod: 'bank_transfer',
        orderData: orderData 
      } 
    });
  };

  return (
    <div className="vietqr-container">
      <div className="vietqr-content">
        <Card className="vietqr-card">
          <div className="vietqr-header">
            <QrcodeOutlined className="qr-icon" />
            <Title level={2}>Thanh Toán Qua VietQR</Title>
          </div>

          <Divider />

          <div className="qr-section">
            <div className="qr-code-container">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="VietQR Code" 
                  className="qr-code-image"
                />
              ) : (
                <div className="qr-loading">
                  <p>Đang tạo mã QR...</p>
                </div>
              )}
            </div>

            <div className="qr-instructions">
              <Title level={4}>Hướng dẫn thanh toán:</Title>
              <ol>
                <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                <li>Chọn tính năng quét mã QR</li>
                <li>Quét mã QR bên trên</li>
                <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                <li>Nhấn "Hoàn thành" sau khi chuyển khoản</li>
              </ol>
            </div>
          </div>

          <Divider />

          <div className="bank-info-section">
            <Title level={4}>Thông tin chuyển khoản:</Title>
            
            <Space direction="vertical" size="large" className="bank-info-list">
              <div className="bank-info-item">
                <Text strong>Ngân hàng:</Text>
                <Text>{bankInfo.bankCode}</Text>
                <Button 
                  type="text" 
                  icon={copiedField === 'bank' ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(bankInfo.bankCode, 'bank')}
                  size="small"
                />
              </div>

              <div className="bank-info-item">
                <Text strong>Số tài khoản:</Text>
                <Text copyable={{ text: bankInfo.accountNumber }}>
                  {bankInfo.accountNumber}
                </Text>
              </div>

              <div className="bank-info-item">
                <Text strong>Tên tài khoản:</Text>
                <Text>{bankInfo.accountName}</Text>
                <Button 
                  type="text" 
                  icon={copiedField === 'name' ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(bankInfo.accountName, 'name')}
                  size="small"
                />
              </div>

              <div className="bank-info-item">
                <Text strong>Số tiền:</Text>
                <Text className="amount-text">
                  {bankInfo.amount.toLocaleString('vi-VN')}đ
                </Text>
                <Button 
                  type="text" 
                  icon={copiedField === 'amount' ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => copyToClipboard(bankInfo.amount.toString(), 'amount')}
                  size="small"
                />
              </div>

              <div className="bank-info-item">
                <Text strong>Nội dung:</Text>
                <Text copyable={{ text: bankInfo.content }}>
                  {bankInfo.content}
                </Text>
              </div>
            </Space>
          </div>

          <Divider />

          <div className="important-note">
            <Paragraph className="note-text">
              <strong>Lưu ý quan trọng:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung để chúng tôi có thể xác nhận đơn hàng của bạn nhanh chóng.
            </Paragraph>
          </div>

          <div className="action-buttons">
            <Button 
              type="primary" 
              size="large" 
              onClick={handleComplete}
              className="complete-button"
            >
              Hoàn Thành Thanh Toán
            </Button>
            
            <Button 
              size="large" 
              onClick={() => navigate(-1)}
              className="back-button"
            >
              Quay Lại
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VietQR;
