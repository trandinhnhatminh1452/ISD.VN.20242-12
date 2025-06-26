package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Service.AdminOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private static final Logger logger = LoggerFactory.getLogger(AdminOrderController.class);

    @Autowired
    private AdminOrderService adminOrderService;

    // Lấy danh sách tất cả đơn hàng
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = adminOrderService.findAllOrders();
            if (orders.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            logger.error("Error fetching all orders: ", e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Duyệt đơn hàng (PUT - RESTful)
    @PutMapping("/{orderId}/approve")
    public ResponseEntity<String> approveOrder(@PathVariable Integer orderId) {
        try {
            adminOrderService.approveOrder(orderId);
            return ResponseEntity.ok("Order approved successfully");
        } catch (Exception e) {
            logger.error("Error approving order {}: ", orderId, e);
            return ResponseEntity.badRequest().body("Failed to approve order: " + e.getMessage());
        }
    }

    // Duyệt đơn hàng (POST - fallback cho client gửi POST)
    @PostMapping("/{orderId}/approve")
    public ResponseEntity<String> approveOrderPost(@PathVariable Integer orderId) {
        return approveOrder(orderId); // Tái sử dụng logic đã có
    }

    // Hủy đơn hàng
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId) {
        try {
            adminOrderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order canceled successfully");
        } catch (Exception e) {
            logger.error("Error canceling order {}: ", orderId, e);
            return ResponseEntity.badRequest().body("Failed to cancel order: " + e.getMessage());
        }
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable Integer orderId) {
        try {
            Order order = adminOrderService.getOrderById(orderId);
            if (order != null) {
                return ResponseEntity.ok(order);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error fetching order details for orderId {}: ", orderId, e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
