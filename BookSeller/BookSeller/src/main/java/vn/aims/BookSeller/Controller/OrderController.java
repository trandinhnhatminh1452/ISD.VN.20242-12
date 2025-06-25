package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


import vn.aims.BookSeller.Service.OrderService;

import java.util.Map;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> orderData) {
        Integer orderId = orderService.createOrder(orderData);
        String paymentMethod = (String) orderData.get("paymentMethod");
        return ResponseEntity.ok(Map.of("orderId", orderId, "paymentMethod", paymentMethod));
    }

    @GetMapping("/invoice/{orderId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getInvoiceByOrderId(@PathVariable Integer orderId) {
        Map<String, Object> invoice = orderService.getInvoiceFromOrder(orderId);
        if (invoice == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/transactions/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getTransactionHistory(@PathVariable Integer userId) {
        return ResponseEntity.ok(orderService.getTransactionHistory(userId));
    }
   private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    // Lấy danh sách tất cả đơn hàng
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.findAllOrders();
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
    public ResponseEntity<String> approveOrder(@PathVariable Long orderId) {
        try {
            orderService.approveOrder(orderId);
            return ResponseEntity.ok("Order approved successfully");
        } catch (Exception e) {
            logger.error("Error approving order {}: ", orderId, e);
            return ResponseEntity.badRequest().body("Failed to approve order: " + e.getMessage());
        }
    }

    // Duyệt đơn hàng (POST - fallback cho client gửi POST)
    @PostMapping("/{orderId}/approve")
    public ResponseEntity<String> approveOrderPost(@PathVariable Long orderId) {
        return approveOrder(orderId); // Tái sử dụng logic đã có
    }

    // Hủy đơn hàng
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order canceled successfully");
        } catch (Exception e) {
            logger.error("Error canceling order {}: ", orderId, e);
            return ResponseEntity.badRequest().body("Failed to cancel order: " + e.getMessage());
        }
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
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
} 

