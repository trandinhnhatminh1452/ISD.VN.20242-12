package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Repository.OrderRepository;

import java.time.LocalTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderService(OrderRepository repo) {
        this.orderRepository = repo;
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    //  Duyệt đơn hàng
    public void approveOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("0".equals(order.getStatus())) { // Trạng thái: Chờ duyệt
            order.setStatus("1"); // Cập nhật sang: Đã duyệt

            //  Xử lý rush_time nếu chưa có (ép kiểu đúng)
            if (order.getRushTime() == null) {
                order.setRushTime(String.valueOf(LocalTime.of(14, 0))); // Giao gấp mặc định: 14:00
            }

            orderRepository.save(order);
            return;
        }

        throw new RuntimeException("Order cannot be approved because it is not in pending state");
    }

    // Từ chối đơn hàng
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("0".equals(order.getStatus())) {
            order.setStatus("2"); // Cập nhật sang: Đã từ chối
            orderRepository.save(order);
            return;
        }

        throw new RuntimeException("Order cannot be canceled because it is not in pending state");
    }

    // Lấy chi tiết đơn hàng
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }
}
