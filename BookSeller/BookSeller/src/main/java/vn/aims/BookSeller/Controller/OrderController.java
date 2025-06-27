package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Service.OrderService;

import java.util.Map;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:3000,http://localhost:5173")
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
    @CrossOrigin(origins = "http://localhost:3000,http://localhost:5173")
    public ResponseEntity<?> getInvoiceByOrderId(@PathVariable Integer orderId) {
        Map<String, Object> invoice = orderService.getInvoiceFromOrder(orderId);
        if (invoice == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/transactions/{userId}")
    @CrossOrigin(origins = "http://localhost:3000,http://localhost:5173")
    public ResponseEntity<?> getTransactionHistory(@PathVariable Integer userId) {
        return ResponseEntity.ok(orderService.getTransactionHistory(userId));
    }
} 