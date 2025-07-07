package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aims.BookSeller.Controller.AdminOrderController.OrderItemDTO;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Entity.PaymentTransaction;
import vn.aims.BookSeller.Repository.PaymentTransactionRepo;
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
    private java.time.LocalDateTime createdAt;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String provinceCity;
    private String paymentMethod;
    private String note;
    private List<OrderItemDTO> items;
    private BigDecimal paidAmount;


     public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public void setStatus(String status) { this.status = status; }
    public void setFinalAmount(BigDecimal finalAmount) { this.finalAmount = finalAmount; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAddress(String address) { this.address = address; }
    public void setProvinceCity(String provinceCity) { this.provinceCity = provinceCity; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setNote(String note) { this.note = note; }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemDTO {
        private Integer productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;

        public void setProductId(Integer productId) { this.productId = productId; }
        public void setProductName(String productName) { this.productName = productName; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public void setPrice(BigDecimal price) { this.price = price; }
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
                    dto.setFinalAmount(order.getFinalAmount()); 
                    dto.setCreatedAt(order.getCreatedAt());
                    dto.setName(order.getName());
                    dto.setEmail(order.getEmail());
                    dto.setPhone(order.getPhone());
                    dto.setAddress(order.getAddress());
                    dto.setProvinceCity(order.getProvinceCity());

                    
                    if (order.getOrderItems() != null) {
                        List<OrderItemDTO> items = order.getOrderItems().stream()
                            .map(item -> {
                                OrderItemDTO itemDTO = new OrderItemDTO();
                                itemDTO.setProductId(item.getProduct().getProductId());
                                itemDTO.setProductName(item.getProduct().getTitle());
                                itemDTO.setQuantity(item.getQuantity());
                                itemDTO.setPrice(item.getPrice());
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

    @Autowired
private PaymentTransactionRepo paymentTransactionRepo;

    // Lấy chi tiết đơn hàng
    @GetMapping("/{orderId}")
public ResponseEntity<OrderDTO> getOrderDetails(@PathVariable Integer orderId) {
    try {
        Order order = adminOrderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        OrderDTO dto = new OrderDTO();  
        dto.setOrderId(order.getOrderId());
        dto.setStatus(order.getStatus());
        dto.setFinalAmount(order.getFinalAmount());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setName(order.getName());
        dto.setEmail(order.getEmail());
        dto.setPhone(order.getPhone());
        dto.setAddress(order.getAddress());
        dto.setProvinceCity(order.getProvinceCity());

        
        PaymentTransaction transaction = paymentTransactionRepo.findByOrderId(orderId);
        if (transaction != null) {
            dto.setPaymentMethod(transaction.getContent()); 
            dto.setPaidAmount(transaction.getAmount());    
        }

        if (order.getOrderItems() != null) {
            List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setProductId(item.getProduct().getProductId());
                    itemDTO.setProductName(item.getProduct().getTitle());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

            dto.setItems(items);
        }

        return ResponseEntity.ok(dto);

    } catch (Exception e) {
        logger.error("Error fetching order details for orderId {}: ", orderId, e);
        return ResponseEntity.badRequest().body(null);
    }
}

}
