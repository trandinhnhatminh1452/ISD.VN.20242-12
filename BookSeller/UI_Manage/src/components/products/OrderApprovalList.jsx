import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderApprovalDetails from "./OrderApprovalDetail"; // Kiểm tra đường dẫn

const OrderApprovalList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/order",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const fetchedOrders = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched Orders:", fetchedOrders);
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
        console.error("Fetch Error:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
      case "CREATED":
        return "Chờ duyệt";
      case "APPROVED":
        return "Đã duyệt";
      case "REJECTED":
      case "canceled":
        return "Từ chối";
      default:
        return status || "Không rõ";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
      case "CREATED":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order.orderId?.toString().includes(term) ||
      order.name?.toLowerCase().includes(term)
    );
  });

  const handleViewOrder = (order) => {
    if (!order?.orderId) {
      console.error("Invalid order selected:", order);
      return;
    }
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const handleStatusUpdate = (orderId, status, note) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status, note } : order
      )
    );
    setSelectedOrder(null);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Đang tải dữ liệu...</div>
    );

  if (error)
    return <div className="p-6 text-center text-red-600">Lỗi: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Tất cả đơn hàng</h2>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65l4.35 4.35z"
            />
          </svg>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Danh sách đơn hàng ({filteredOrders.length})
        </h3>

        <div className="overflow-x-auto">
          {selectedOrder ? (
            <OrderApprovalDetails
              order={selectedOrder}
              onBack={handleBack}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Mã đơn
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Khách hàng
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tổng
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Ngày đặt
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Trạng thái
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 text-gray-900">{order.orderId}</td>
                    <td className="py-4 px-4 text-gray-900">
                      {order.name || "Không có tên"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {order.email || "Không có email"}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {order.finalAmount?.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={getStatusClass(order.status)}
                        style={{
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderApprovalList;
