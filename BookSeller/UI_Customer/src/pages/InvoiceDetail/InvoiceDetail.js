import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invoiceAPI } from '../../utils/api';
import './InvoiceDetail.scss';

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await invoiceAPI.getInvoiceById(id);
        setInvoice(res.invoice || res); // Nếu backend trả về {invoice: ...}
      } catch (err) {
        setError('Không tìm thấy hóa đơn!');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  useEffect(() => {
    if (invoice) {
      console.log('Invoice chi tiết:', invoice);
    }
  }, [invoice]);

  if (loading) return <p>Đang tải hóa đơn...</p>;
  if (error) return <p>{error}</p>;
  if (!invoice) return <p>Không có dữ liệu hóa đơn.</p>;

  // Tìm trường ngày lập phù hợp
  const createdDate = invoice.createdAt || invoice.invoiceDate || invoice.date || '';
  // Tìm trường danh sách sản phẩm phù hợp
  const items = invoice.items || invoice.orderItems || invoice.products || [];

  return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-card">
        <h1>HÓA ĐƠN THANH TOÁN</h1>
        <div className="invoice-info">
          <div><b>Mã hóa đơn:</b> {invoice.orderId || invoice.invoiceId}</div>
          <div><b>Ngày lập:</b> {createdDate ? createdDate.replace('T', ' ').slice(0, 19) : 'Không rõ'}</div>
          <div><b>Khách hàng:</b> {invoice.name || invoice.customerName}</div>
          <div><b>Email:</b> {invoice.email || invoice.customerEmail}</div>
          <div><b>SĐT:</b> {invoice.phone || invoice.customerPhone}</div>
          <div><b>Địa chỉ:</b> {invoice.address || invoice.customerAddress}, {invoice.provinceCity}</div>
          <div><b>Trạng thái:</b> {invoice.status}</div>
        </div>
        {items.length > 0 && (
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
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product?.title || item.title || item.name || 'Không rõ'}</td>
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
          <div><b>Tạm tính:</b> {Number(invoice.totalPrice || invoice.subtotal).toLocaleString('vi-VN')}đ</div>
          <div><b>Phí vận chuyển:</b> {Number(invoice.deliveryFee).toLocaleString('vi-VN')}đ</div>
          <div><b>VAT:</b> {Number(invoice.vatFee).toLocaleString('vi-VN')}đ</div>
          <div className="invoice-total">
            <b>Tổng cộng:</b> <span>{Number(invoice.finalAmount || invoice.totalAmount).toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 