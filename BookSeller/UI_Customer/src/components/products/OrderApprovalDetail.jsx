import React, { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";

const OrderApprovalDetails = ({ order, onBack, onStatusUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!order || !order.orderId) {
        setError("Dữ liệu đơn hàng không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/order/${order.orderId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Không thể tải chi tiết đơn hàng");
        }

        const data = await res.json();
        setOrderDetails(data);
      } catch (err) {
        console.error("Fetch order details error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order]);

  const handleApprove = async () => {
    if (!order || !order.orderId) {
      alert("Không thể duyệt: Dữ liệu đơn hàng không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/admin/order/${order.orderId}/approve`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text || `Failed to approve order: ${response.statusText}`
        );
      }

      alert("Đơn hàng đã được duyệt!");
      onStatusUpdate(order.orderId, "APPROVED", "Order approved");
      onBack();
    } catch (err) {
      alert("Lỗi khi duyệt đơn hàng: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!order || !order.orderId) {
      alert("Không thể từ chối: Dữ liệu đơn hàng không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/admin/order/${order.orderId}/cancel`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text || `Failed to reject order: ${response.statusText}`
        );
      }

      alert("Đơn hàng đã bị từ chối!");
      onStatusUpdate(order.orderId, "REJECTED", "Order rejected");
      onBack();
    } catch (err) {
      alert("Lỗi khi từ chối đơn hàng: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Đang xử lý...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Lỗi: {error}</div>;
  if (!orderDetails)
    return (
      <div className="p-6 text-center text-gray-600">
        Không có dữ liệu đơn hàng
      </div>
    );

  const items = Array.isArray(orderDetails.items) ? orderDetails.items : [];
  const subtotal = orderDetails.subtotal || 0;
  const vat = orderDetails.vatFee || 0;
  const total = orderDetails.totalAmount || 0;

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Chi tiết đơn hàng #{orderDetails.orderId}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sản phẩm đặt hàng</h3>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">
                  {item.productName || "Không có tên sản phẩm"}
                </p>
                <p className="text-gray-600">Số lượng: {item.quantity || 0}</p>
                <p className="text-gray-600">
                  Đơn giá: {(item.price || 0).toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))
          ) : (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg text-gray-600">
              Không có sản phẩm
            </div>
          )}
          <div className="mt-4">
            <p className="text-gray-800 font-bold">
              Tổng cộng (Đã cộng VAT):{" "}
              {orderDetails.paidAmount?.toLocaleString("vi-VN") || "0"}đ
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin khách hàng</h3>
          <p>
            <strong>Tên khách hàng:</strong>{" "}
            {orderDetails.name || "Không có tên"}
          </p>
          <p>
            <strong>Số điện thoại:</strong>{" "}
            {orderDetails.phone || "Không có số"}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email || "Không có email"}
          </p>
          <p>
            <strong>Địa chỉ hàng:</strong>{" "}
            {orderDetails.address || "Không có địa chỉ"}
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-4">
            Thông tin đơn hàng
          </h3>
          <p>
            <strong>Ngày đặt hàng:</strong> {formatDate(orderDetails.createdAt)}
          </p>

          <p>
            <strong>{orderDetails.paymentMethod || "Chưa cập nhật"}</strong>{" "}
          </p>
          <p>
            <strong>Trạng thái:</strong> {getStatusText(orderDetails.status)}
          </p>
          <p>
            <strong>Chú ý:</strong> {orderDetails.note || "Không có"}
          </p>
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
  if (!dateString) return "Chưa cập nhật";
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN");
};

const getStatusText = (status) => {
  switch (status) {
    case "CREATED":
      return "Chờ duyệt";
    case "APPROVED":
      return "Đã duyệt";
    case "REJECTED":
      return "Từ chối";
    default:
      return "Không rõ";
  }
};

export default OrderApprovalDetails;
