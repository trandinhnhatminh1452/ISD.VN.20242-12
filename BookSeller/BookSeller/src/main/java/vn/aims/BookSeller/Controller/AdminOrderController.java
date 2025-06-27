package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Service.AdminOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api/admin/order")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminOrderController {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderDTO {
    private Integer orderId;
    private String status;
    private BigDecimal finalAmount;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private List<OrderItemDTO> items;

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setFinalAmount(BigDecimal finalAmount) {
        this.finalAmount = finalAmount;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemDTO {
    private Integer productId;
    private Integer quantity;
    private BigDecimal price;
    private String productName;

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}


    private static final Logger logger = LoggerFactory.getLogger(AdminOrderController.class);

    @Autowired
    private AdminOrderService adminOrderService;

    // Lấy danh sách tất cả đơn hàng
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        try {
            List<Order> orders = adminOrderService.findAllOrders();
            List<OrderDTO> orderDTOs = orders.stream()
                .map(order -> {
                    OrderDTO dto = new OrderDTO();
                    dto.setOrderId(order.getOrderId());
                    dto.setStatus(order.getStatus());
                    dto.setFinalAmount(order.getFinalAmount()); // Đảm bảo finalAmount là BigDecimal
                    dto.setCreatedAt(order.getCreatedAt());
                    dto.setName(order.getName());
                    dto.setEmail(order.getEmail());
                    
                    // Map order items
                    if (order.getOrderItems() != null) {
                        List<OrderItemDTO> items = Arrays.stream(order.getOrderItems())
                            .map(item -> {
                                OrderItemDTO itemDTO = new OrderItemDTO();
                                itemDTO.setProductId(item.getProduct().getProductId());
                                itemDTO.setQuantity(item.getQuantity());
                                itemDTO.setPrice(item.getPrice());
                                itemDTO.setProductName(item.getProduct().getTitle());
                                return itemDTO;
                            })
                            .collect(Collectors.toList());
                        dto.setItems(items);
                    }
                    return dto;
                })
                .collect(Collectors.toList());

            if (orderDTOs.isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>());
            }
            return ResponseEntity.ok(orderDTOs);
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
