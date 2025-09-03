# 📚 Product Management & E-Commerce System

Một hệ thống **quản lý và bán sản phẩm trực tuyến** được xây dựng bằng **Spring Boot (Backend)** và **ReactJS (Frontend)**.  
Hệ thống hỗ trợ quản lý nhiều loại sản phẩm khác nhau (Book, CD, DVD, LP…), với các thuộc tính chung và riêng cho từng loại.

---

## 🚀 Tính năng chính

### 👩‍💻 Backend (Spring Boot + PostgreSQL)
- **Authentication & Authorization**: Spring Security + JWT (vai trò: `ROLE_USER`, `ROLE_ADMIN`, `ROLE_MANAGER`).
- **Quản lý sản phẩm**:
  - Thêm / sửa / xóa sản phẩm.
  - Hỗ trợ nhiều loại sản phẩm với thuộc tính riêng (Book, CD, DVD, LP).
  - Xem chi tiết sản phẩm.
- **Quản lý giỏ hàng**:
  - Thêm / xóa / sửa số lượng sản phẩm.
  - Tự động tạo giỏ hàng cho mỗi user.
- **Quản lý đơn hàng**:
  - Đặt hàng, đặt hàng nhanh (rush order).
  - Xem chi tiết đơn hàng.
- **Thanh toán**:
  - Lưu lịch sử giao dịch (`payment_transaction`).

### 🎨 Frontend (ReactJS + TailwindCSS)
- **Giao diện thân thiện** với người dùng.
- **Quản lý động theo vai trò**:
  - `ROLE_USER`: xem & mua hàng.
  - `ROLE_ADMIN` / `ROLE_MANAGER`: quản lý sản phẩm, đơn hàng, người dùng.
- **Form động** khi thêm/cập nhật sản phẩm (mỗi loại có thuộc tính riêng).
- **Trang chi tiết sản phẩm** hiển thị đầy đủ thông tin theo loại sản phẩm.
- **Giỏ hàng & thanh toán trực tuyến**.

---

## 🛠️ Công nghệ sử dụng

### Backend
- Java 17, Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA (ORM)
- PostgreSQL
- Maven

### Frontend
- ReactJS (Vite hoặc CRA)
- React Router
- Axios (gọi API)
- TailwindCSS (UI)
- shadcn/ui + lucide-react (icons, components)

---

## ⚙️ Cài đặt & Chạy

### Backend (Spring Boot)
```bash
cd BookSeller
mvn clean install
mvn spring-boot:run
```
### Frontend (ReactJs)
```bash
cd UI_Customer
npm install
npm run dev
```
----
## 🔑 Tài khoản mẫu

- **Admin**
  - Username: `admin`
  - Password: `123456`

- **User**
  - Username: `user`
  - Password: `123456`

