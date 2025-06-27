import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

const OrderApprovalDetails = ({ order, onBack, onStatusUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!order || !order.orderId) {
      setError('Dữ liệu đơn hàng không hợp lệ');
      console.error('Invalid order data:', order);
    }
    setLoading(false);
  }, [order]);

  const handleApprove = async () => {
    if (!order || !order.orderId) {
      alert('Không thể duyệt: Dữ liệu đơn hàng không hợp lệ');
      return;
    }
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/admin/order/${order.orderId}/approve`;
      console.log('Sending Approve Request to:', url);

      const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include', // Thêm credentials để xử lý cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('API Response:', data);
        throw new Error(data.error || `Failed to approve order: ${response.statusText}`);
      }

      alert('Đơn hàng đã được duyệt!');
      onStatusUpdate(order.orderId, '1', 'Order approved');
      onBack();
    } catch (err) {
      console.error('Approve Error:', err);
      alert('Lỗi khi duyệt đơn hàng: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!order || !order.orderId) {
      alert('Không thể từ chối: Dữ liệu đơn hàng không hợp lệ');
      return;
    }
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/admin/order/${order.orderId}/cancel`;
      console.log('Sending Reject Request to:', url);

      const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include', // Thêm credentials để xử lý cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('API Response:', data);
        throw new Error(data.error || `Failed to reject order: ${response.statusText}`);
      }

      alert('Đơn hàng đã bị từ chối!');
      onStatusUpdate(order.orderId, '2', 'Order rejected');
      onBack();
    } catch (err) {
      console.error('Reject Error:', err);
      alert('Lỗi khi từ chối đơn hàng: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Đang xử lý...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Lỗi: {error}</div>;
  if (!order) return <div className="p-6 text-center text-gray-600">Không có dữ liệu đơn hàng</div>;

  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = order.final_amount ? order.final_amount * 0.9 : 0;
  const vat = order.final_amount ? order.final_amount - subtotal : 0;

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{order.orderId}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sản phẩm đặt hàng</h3>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">{item.product_name || 'Không có tên sản phẩm'}</p>
                <p className="text-gray-600">Số lượng: {item.quantity || 0}</p>
                <p className="text-gray-600">Đơn giá: {(item.price || 0).toLocaleString('vi-VN')}đ</p>
              </div>
            ))
          ) : (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg text-gray-600">Không có sản phẩm</div>
          )}
          <div className="mt-4">
            <p className="text-gray-800">Tổng phụ: {subtotal.toLocaleString('vi-VN')}đ</p>
            <p className="text-gray-800">VAT (10%): {vat.toLocaleString('vi-VN')}đ</p>
            <p className="text-gray-800 font-bold">Tổng cộng: {(order.final_amount || 0).toLocaleString('vi-VN')}đ</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin khách hàng</h3>
          <p><strong>Tên khách hàng:</strong> {order.name || 'Không có tên'}</p>
          <p><strong>Số điện thoại:</strong> {order.phone || 'Không có số'}</p>
          <p><strong>Email:</strong> {order.email || 'Không có email'}</p>
          <p><strong>Địa chỉ hàng:</strong> {order.address || 'Không có địa chỉ'}</p>

          <h3 className="text-lg font-semibold mt-6 mb-4">Thông tin đơn hàng</h3>
          <p><strong>Ngày đặt hàng:</strong> {formatDate(order.created_at)}</p>
          <p><strong>Phương thức thanh toán:</strong> {order.payment_method || 'Chưa cập nhật'}</p>
          <p><strong>Trạng thái:</strong> {getStatusText(order.status)}</p>
          <p><strong>Chú ý:</strong> {order.note || 'Không có'}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <XCircle className="w-5 h-5 inline mr-2" /> Từ chối đơn hàng
        </button>
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <CheckCircle className="w-5 h-5 inline mr-2" /> Duyệt đơn hàng
        </button>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return 'Chưa cập nhật';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN');
};

const getStatusText = (status) => {
  switch (status) {
    case '0': return 'Chờ duyệt';
    case '1': return 'Đã duyệt';
    case '2': return 'Từ chối';
    default: return 'Không rõ';
  }
};

export default OrderApprovalDetails;
