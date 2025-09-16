# Giải thích Class Diagram và Sequence Diagram - Đặt Hàng & Thanh Toán

## 1. Tổng quan
Tài liệu này giải thích chi tiết về Class Diagram và Sequence Diagram cho use case "Đặt hàng và Thanh toán" trong hệ thống BookSeller, được thiết kế theo chuẩn Astah UML.

---

## 2. Class Diagram - Order_Payment_Class_Diagram.puml

### 2.1. Cấu trúc các Layer

#### Entity Layer
- **User**: Người dùng hệ thống, có thể đặt hàng, có giỏ hàng, có nhiều vai trò
- **Cart**: Giỏ hàng của người dùng, chứa nhiều CartItem
- **CartItem**: Sản phẩm trong giỏ hàng, liên kết với Product
- **Product**: Sản phẩm được bán
- **Order**: Đơn hàng, thuộc về một User, chứa nhiều OrderItem
- **OrderItem**: Sản phẩm trong đơn hàng, liên kết với Product
- **PaymentTransaction**: Giao dịch thanh toán cho đơn hàng
- **Role**: Vai trò của người dùng

#### Service Layer
- **OrderService**: Xử lý logic đặt hàng, tạo đơn, tạo giao dịch thanh toán
- **CartItemService**: Xử lý logic giỏ hàng (thêm, xóa, tăng/giảm số lượng)
- **AdminOrderService**: Xử lý logic quản trị đơn hàng (duyệt, hủy)

#### Controller Layer
- **OrderController**: API cho khách hàng đặt hàng
- **CartItemController**: API cho thao tác giỏ hàng
- **AdminOrderController**: API cho admin quản lý đơn hàng

#### Repository Layer
- **OrderRepo**: Truy xuất dữ liệu đơn hàng
- **CartItemRepo**: Truy xuất dữ liệu giỏ hàng
- **PaymentTransactionRepo**: Truy xuất dữ liệu giao dịch thanh toán
- **ProductRepo**: Truy xuất dữ liệu sản phẩm
- **UserRepo**: Truy xuất dữ liệu người dùng

#### DTO Layer
- **CartItemRequest**: Dữ liệu request thao tác giỏ hàng
- **CartItemResponse**: Dữ liệu response giỏ hàng
- **OrderDTO**: Dữ liệu truyền đơn hàng
- **OrderItemDTO**: Dữ liệu truyền sản phẩm trong đơn hàng

### 2.2. Các mối quan hệ chính

- **User** 1--1 **Cart**: 1 user có 1 giỏ hàng
- **User** 1--n **Order**: 1 user có nhiều đơn hàng
- **User** n--n **Role**: 1 user có nhiều role, 1 role có nhiều user
- **Cart** 1--n **CartItem**: 1 giỏ hàng có nhiều sản phẩm
- **CartItem** n--1 **Product**: 1 sản phẩm có thể nằm trong nhiều cart item
- **Order** 1--n **OrderItem**: 1 đơn hàng có nhiều sản phẩm
- **OrderItem** n--1 **Product**: 1 sản phẩm có thể nằm trong nhiều order item
- **Order** 1--n **PaymentTransaction**: 1 đơn hàng có nhiều giao dịch thanh toán

### 2.3. Dependency Relationships
- Controllers sử dụng Services
- Services sử dụng Repositories
- Tất cả đều tuân theo nguyên tắc Dependency Inversion

---

## 3. Sequence Diagram - Order_Payment_Sequence_Diagram.puml

### 3.1. Luồng Đặt Hàng

#### Bước 1: Khách hàng thao tác trên frontend
- **Actor**: Customer
- **Component**: Payment.jsx
- **Hoạt động**: 
  - Chọn sản phẩm, nhập thông tin
  - Tính toán totalPrice, deliveryFee, vatFee, finalAmount
  - Gửi request POST `/api/order/create`

#### Bước 2: Backend xử lý đặt hàng
- **OrderController**: Nhận request, gọi OrderService
- **OrderService**: 
  - Tạo Order entity với thông tin khách hàng
  - Lặp qua orderItems, tạo OrderItem cho mỗi sản phẩm
  - Lưu Order và OrderItems vào database
  - Tạo PaymentTransaction

#### Bước 3: Tạo giao dịch thanh toán
- **OrderService.createPaymentTransaction()**:
  - Sinh transactionId: `orderId + "ord" + datetime`
  - Set amount = order.finalAmount
  - Set content = "Chuyển khoản qua VietQR - HOADON" + orderId
  - Set status = "CREATED"
  - Lưu vào database

### 3.2. Luồng Xác Nhận Thanh Toán

#### Bước 1: Admin xác nhận
- **Actor**: Admin
- **API**: PUT `/api/admin/order/{orderId}/approve`
- **AdminOrderController**: Nhận request, gọi AdminOrderService

#### Bước 2: Cập nhật trạng thái
- **AdminOrderService.approveOrder()**:
  - Tìm Order theo orderId
  - Cập nhật status = "APPROVED"
  - Tìm PaymentTransaction theo orderId
  - Cập nhật PaymentTransaction status = "APPROVED"

---

## 4. Các thành phần quan trọng

### 4.1. Tính toán giá tiền
- **Frontend**: Tính totalPrice, deliveryFee, vatFee, finalAmount
- **Backend**: Nhận các giá trị này từ frontend, không tính lại

### 4.2. Tạo mã giao dịch
- **Hàm**: `OrderService.createPaymentTransaction()`
- **Công thức**: `transactionId = orderId + "ord" + yyyyMMddHHmmss`
- **Ví dụ**: Nếu orderId = 123, thời gian = 2024-06-01 15:30:45
  - transactionId = "123ord20240601153045"

### 4.3. Nội dung chuyển khoản
- **Backend**: Tạo content = "Chuyển khoản qua VietQR - HOADON" + orderId
- **Frontend**: Hiển thị nội dung "HOADON" + orderId trong mã QR

### 4.4. Trạng thái đơn hàng
- **CREATED**: Đơn hàng mới tạo, chờ duyệt
- **APPROVED**: Đơn hàng đã được duyệt
- **REJECTED**: Đơn hàng bị từ chối

---

## 5. Ưu điểm của thiết kế

### 5.1. Separation of Concerns
- Mỗi layer có trách nhiệm riêng biệt
- Controller xử lý HTTP request/response
- Service xử lý business logic
- Repository xử lý data access

### 5.2. Loose Coupling
- Các component ít phụ thuộc vào nhau
- Dễ dàng thay đổi implementation
- Dễ dàng test từng component

### 5.3. Scalability
- Có thể mở rộng thêm tính năng
- Dễ dàng thêm payment method mới
- Có thể thêm validation rules

---

## 6. Kết luận

Class Diagram và Sequence Diagram này cung cấp cái nhìn tổng quan về kiến trúc hệ thống đặt hàng và thanh toán, giúp developers hiểu rõ:
- Cấu trúc các thành phần
- Mối quan hệ giữa các component
- Luồng xử lý từ frontend đến backend
- Cách thức tạo và quản lý đơn hàng, giao dịch thanh toán

Đây là nền tảng để phát triển, bảo trì và mở rộng hệ thống một cách hiệu quả. 