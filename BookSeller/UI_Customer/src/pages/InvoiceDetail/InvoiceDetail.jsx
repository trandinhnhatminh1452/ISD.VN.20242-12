import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { invoiceAPI } from '../../utils/api';
import './InvoiceDetail.scss';

const InvoiceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy paymentMethod từ state nếu có (khi vừa đặt hàng xong)
  const paymentMethodFromState = location.state?.paymentMethod;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await invoiceAPI.getInvoiceById(id);
        setInvoice(data);
      } catch (err) {
        setError('Không tìm thấy hóa đơn!');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading) return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-card">
        <p>Đang tải hóa đơn...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-card">
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
  
  if (!invoice) return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-card">
        <p>Không có dữ liệu hóa đơn.</p>
      </div>
    </div>
  );

  // Lấy ngày lập hóa đơn rõ ràng
  const createdDate = invoice.createdAt || invoice.invoiceDate || invoice.date || '';
  const formattedDate = createdDate ? new Date(createdDate).toLocaleString('vi-VN', { hour12: false }) : 'Không rõ';

  return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-card">
        <h1>HÓA ĐƠN THANH TOÁN</h1>
        <div className="invoice-info">
          <div><b>Mã hóa đơn:</b> {invoice.invoiceNumber || invoice.orderId || invoice.invoiceId}</div>
          <div><b>Ngày lập:</b> {formattedDate}</div>
          <div><b>Khách hàng:</b> {invoice.customerName}</div>
          <div><b>Email:</b> {invoice.customerEmail}</div>
          <div><b>SĐT:</b> {invoice.customerPhone}</div>
          <div><b>Địa chỉ:</b> {invoice.customerAddress}, {invoice.provinceCity}</div>
          <div><b>Phương thức thanh toán:</b> {
            paymentMethodFromState === 'cod'
              ? 'Thanh toán khi nhận hàng'
              : paymentMethodFromState === 'vnpay'
                ? 'Thanh toán qua VNPay'
                : (invoice.paymentMethod === 'cod'
                    ? 'Thanh toán khi nhận hàng'
                    : invoice.paymentMethod === 'vnpay'
                      ? 'Thanh toán qua VNPay'
                      : 'Chuyển khoản')
          }</div>
          <div><b>Trạng thái:</b> {invoice.status === 'ISSUED' ? 'Đã phát hành' : invoice.status}</div>
        </div>

        {invoice.items && invoice.items.length > 0 && (
          <div className="invoice-items-section">
            <h2>Danh sách sản phẩm</h2>
            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.price).toLocaleString('vi-VN')}đ</td>
                    <td>{(Number(item.price) * Number(item.quantity)).toLocaleString('vi-VN')}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="invoice-summary">
          <div><b>Tạm tính:</b> {Number(invoice.subtotal).toLocaleString('vi-VN')}đ</div>
          <div><b>Phí vận chuyển:</b> {Number(invoice.deliveryFee).toLocaleString('vi-VN')}đ</div>
          <div><b>VAT:</b> {Number(invoice.vatFee).toLocaleString('vi-VN')}đ</div>
          <div className="invoice-total">
            <b>Tổng cộng:</b> <span>{Number(invoice.totalAmount).toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 