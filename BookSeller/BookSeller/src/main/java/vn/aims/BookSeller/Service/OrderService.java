package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Entity.OrderItem;
import vn.aims.BookSeller.Entity.PaymentTransaction;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.User;
import vn.aims.BookSeller.Repository.OrderRepo;
import vn.aims.BookSeller.Repository.PaymentTransactionRepo;
import vn.aims.BookSeller.Repository.ProductRepo;
import vn.aims.BookSeller.Repository.UserRepo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;
    
    @Autowired
    private PaymentTransactionRepo paymentTransactionRepo;
    
    @Autowired
    private UserRepo userRepo;

    public Map<String, Object> getInvoiceFromOrder(Integer orderId) {
        Optional<Order> orderOpt = orderRepo.findById(orderId);
        if (orderOpt.isEmpty()) return null;
        Order order = orderOpt.get();
        Map<String, Object> result = new HashMap<>();
        result.put("orderId", order.getOrderId());
        result.put("customerName", order.getName());
        result.put("customerEmail", order.getEmail());
        result.put("customerPhone", order.getPhone());
        result.put("customerAddress", order.getAddress());
        result.put("provinceCity", order.getProvinceCity());
        result.put("subtotal", order.getTotalPrice());
        result.put("deliveryFee", order.getDeliveryFee());
        result.put("vatFee", order.getVatFee());
        result.put("totalAmount", order.getFinalAmount());
        result.put("status", order.getStatus());
        result.put("createdAt", order.getCreatedAt());
        List<Map<String, Object>> items = new ArrayList<>();
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                Map<String, Object> prod = new HashMap<>();
                prod.put("title", item.getProduct().getTitle());
                prod.put("price", item.getPrice());
                prod.put("quantity", item.getQuantity());
                items.add(prod);
            }
        }
        result.put("items", items);
        return result;
    }

    public Integer createOrder(Map<String, Object> orderData) {
        Order order = new Order();
        order.setName((String) orderData.get("name"));
        order.setEmail((String) orderData.get("email"));
        order.setPhone((String) orderData.get("phone"));
        order.setAddress((String) orderData.get("address"));
        order.setProvinceCity((String) orderData.get("provinceCity"));
        order.setDeliveryFee(toBigDecimal(orderData.get("deliveryFee")));
        order.setVatFee(toBigDecimal(orderData.get("vatFee")));
        order.setTotalPrice(toBigDecimal(orderData.get("totalPrice")));
        order.setFinalAmount(toBigDecimal(orderData.get("finalAmount")));
        order.setStatus((String) orderData.get("status"));
        order.setCreatedAt(LocalDateTime.now());
        
        // Set user_id if provided
        if (orderData.get("userId") != null) {
            Integer userId = (Integer) orderData.get("userId");
            User user = userRepo.findById(userId).orElse(null);
            if (user != null) {
                order.setUser(user);
            }
        }
        
        // Xử lý orderItems
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("orderItems");
        List<OrderItem> orderItems = new ArrayList<>();
        if (items != null) {
            for (Map<String, Object> item : items) {
                Integer productId = (Integer) item.get("productId");
                Product product = productRepo.findById(productId).orElse(null);
                if (product == null) continue;
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProduct(product);
                orderItem.setQuantity((Integer) item.get("quantity"));
                orderItem.setPrice(toBigDecimal(item.get("price")));
                orderItems.add(orderItem);
            }
        }
        order.setOrderItems(orderItems);
        Order saved = orderRepo.save(order);
        
        // Tạo payment transaction
        createPaymentTransaction(saved, orderData);
        
        return saved.getOrderId();
    }
    
    private void createPaymentTransaction(Order order, Map<String, Object> orderData) {
        PaymentTransaction transaction = new PaymentTransaction();
        
        // Tạo transaction_id theo format: order_id + ord + datetime
        LocalDateTime now = LocalDateTime.now();
        String datetimeStr = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String transactionId = order.getOrderId() + "ord" + datetimeStr;
        
        transaction.setTransactionId(transactionId);
        transaction.setOrder(order);
        transaction.setAmount(order.getFinalAmount());
        
        // Lấy phương thức thanh toán từ frontend
        String paymentMethod = (String) orderData.get("paymentMethod");
        transaction.setContent("Phương thức thanh toán: " + paymentMethod);
        
        transaction.setDatetime(now);
        transaction.setStatus("completed");
        
        paymentTransactionRepo.save(transaction);
    }
    
    public List<Map<String, Object>> getTransactionHistory(Integer userId) {
        List<PaymentTransaction> transactions = paymentTransactionRepo.findByUserIdOrderByDatetimeDesc(userId);
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (PaymentTransaction transaction : transactions) {
            Map<String, Object> transactionData = new HashMap<>();
            transactionData.put("transactionId", transaction.getTransactionId());
            transactionData.put("orderId", transaction.getOrder().getOrderId());
            transactionData.put("amount", transaction.getAmount());
            transactionData.put("content", transaction.getContent());
            transactionData.put("datetime", transaction.getDatetime());
            transactionData.put("status", transaction.getStatus());
            transactionData.put("orderName", transaction.getOrder().getName());
            transactionData.put("orderEmail", transaction.getOrder().getEmail());
            result.add(transactionData);
        }
        
        return result;
    }

    private BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal) return (BigDecimal) value;
        if (value instanceof Integer) return BigDecimal.valueOf((Integer) value);
        if (value instanceof Long) return BigDecimal.valueOf((Long) value);
        if (value instanceof Double) return BigDecimal.valueOf((Double) value);
        if (value instanceof String) return new BigDecimal((String) value);
        return BigDecimal.ZERO;
    }
} 