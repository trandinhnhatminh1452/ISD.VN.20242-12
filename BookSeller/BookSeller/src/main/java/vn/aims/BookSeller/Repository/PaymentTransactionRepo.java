package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aims.BookSeller.Entity.PaymentTransaction;

import java.util.List;

@Repository
public interface PaymentTransactionRepo extends JpaRepository<PaymentTransaction, String> {
    
    @Query("SELECT pt FROM PaymentTransaction pt JOIN pt.order o WHERE o.user.id = :userId ORDER BY pt.datetime DESC")
    List<PaymentTransaction> findByUserIdOrderByDatetimeDesc(@Param("userId") Integer userId);
    
    @Query("SELECT pt FROM PaymentTransaction pt WHERE pt.order.orderId = :orderId")
    PaymentTransaction findByOrderId(@Param("orderId") Integer orderId);
} 