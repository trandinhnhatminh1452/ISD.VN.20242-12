package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Repository.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    // Duyệt đơn hàng
    public Order approveOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if ("0".equals(order.getStatus())) { // Chờ duyệt
            order.setStatus("1"); // Đã duyệt
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order cannot be approved because it is not in pending state");
    }

    //  Từ chối đơn hàng
    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if ("0".equals(order.getStatus())) {
            order.setStatus("2"); // Đã từ chối
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order cannot be canceled because it is not in pending state");
    }

    // Lấy thông tin một đơn hàng cụ thể
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }
}

