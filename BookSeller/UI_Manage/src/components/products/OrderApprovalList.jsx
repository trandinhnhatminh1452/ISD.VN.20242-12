import React, { useState, useEffect } from 'react';
import { ClipboardList, Check, X } from 'lucide-react';
import axios from 'axios';

const OrderApprovalList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusLabel = (status) => {
    switch (status) {
      case '0': return 'Chờ duyệt';
      case '1': return 'Đã duyệt';
      case '2': return 'Từ chối';
      default: return 'Không xác định';
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders', {
          headers: { "Content-Type": "application/json", }
        });
        console.log('Phản hồi API:', response.data);
        if (Array.isArray(response.data)) {
          const pendingOrders = response.data.filter(order => order.status === '0');
          console.log('Đơn hàng chờ duyệt:', pendingOrders);
          setOrders(pendingOrders);
        } else {
          console.log('Dữ liệu không hợp lệ:', response.data);
          setOrders([]);
        }
      } catch (err) {
        setError('Lỗi: ' + (err.message || 'Không kết nối được'));
        console.error('Lỗi chi tiết:', err.response ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}/approve`);
      setOrders(orders.map(order =>
        order.id === id ? { ...order, status: '1' } : order
      ).filter(order => order.status === '0'));
    } catch (err) {
      setError('Không thể duyệt đơn hàng');
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}/cancel`);
      setOrders(orders.map(order =>
        order.id === id ? { ...order, status: '2' } : order
      ).filter(order => order.status === '0'));
    } catch (err) {
      setError('Không thể hủy đơn hàng');
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <ClipboardList className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Đơn hàng chờ duyệt</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Mã đơn</th>
            <th className="py-2">Khách hàng</th>
            <th className="py-2">Email</th>
            <th className="py-2">Tổng</th>
            <th className="py-2">Ngày đặt</th>
            <th className="py-2">Trạng thái</th>
            <th className="py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.name}</td>
                <td className="py-3">{order.email}</td>
                <td className="py-3">{order.total_price ? `${order.total_price}đ` : 'N/A'}</td>
                <td className="py-3">{order.created_at || 'N/A'}</td>
                <td className="py-3 text-yellow-600">{getStatusLabel(order.status)}</td>
                <td className="py-3 space-x-2">
                  <button
                    onClick={() => handleApprove(order.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center text-sm"
                  >
                    <Check className="w-4 h-4 mr-1" /> Duyệt
                  </button>
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center text-sm"
                  >
                    <X className="w-4 h-4 mr-1" /> Hủy
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 text-center text-gray-600">Không có đơn hàng nào chờ duyệt</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderApprovalList;
