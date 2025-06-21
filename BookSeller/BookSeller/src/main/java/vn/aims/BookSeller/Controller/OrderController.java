package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PutMapping("/{orderId}/approve")
    public ResponseEntity<String> approveOrder(@PathVariable Long orderId) {
        try {
            orderService.approveOrder(orderId);
            return ResponseEntity.ok("Order approved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to approve order: " + e.getMessage());
        }
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order canceled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to cancel order: " + e.getMessage());
        }
    }

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
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.findAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
