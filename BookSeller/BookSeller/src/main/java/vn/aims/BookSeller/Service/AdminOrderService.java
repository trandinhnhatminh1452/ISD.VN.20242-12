package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Repository.OrderRepo;
import vn.aims.BookSeller.Repository.PaymentTransactionRepo;
import vn.aims.BookSeller.Entity.PaymentTransaction;

import java.time.LocalTime;
import java.util.List;

@Service
public class AdminOrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private PaymentTransactionRepo paymentTransactionRepo;

public PaymentTransaction getPaymentTransactionByOrderId(Integer orderId) {
    return paymentTransactionRepo.findByOrderId(orderId);
}

    public List<Order> findAllOrders() {
        return orderRepo.findAll();
    }

    // Duyệt đơn hàng
    public void approveOrder(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("CREATED".equals(order.getStatus())) { // Trạng thái: Chờ duyệt
            order.setStatus("APPROVED"); // Đã duyệt

            if (order.getRushTime() == null) {
                order.setRushTime(LocalTime.of(14, 0)); // Giao gấp mặc định
            }

            orderRepo.save(order);
            // Đồng bộ trạng thái payment_transaction
            PaymentTransaction tx = paymentTransactionRepo.findByOrderId(orderId);
            if (tx != null) {
                tx.setStatus("APPROVED");
                paymentTransactionRepo.save(tx);
            }
            return;
        }

        throw new RuntimeException("Order cannot be approved because it is not in pending state");
    }

    // Từ chối đơn hàng
    public void cancelOrder(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("CREATED".equals(order.getStatus())) {
            order.setStatus("REJECTED"); // Đã từ chối
            orderRepo.save(order);
            // Đồng bộ trạng thái payment_transaction
            PaymentTransaction tx = paymentTransactionRepo.findByOrderId(orderId);
            if (tx != null) {
                tx.setStatus("REJECTED");
                paymentTransactionRepo.save(tx);
            }
            return;
        }

        throw new RuntimeException("Order cannot be canceled because it is not in pending state");
    }

    // Lấy chi tiết đơn hàng
    public Order getOrderById(Integer orderId) {
        return orderRepo.findById(orderId).orElse(null);
    }
}
