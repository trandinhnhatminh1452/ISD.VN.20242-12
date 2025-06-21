package vn.aims.BookSeller.Repository;

import vn.aims.BookSeller.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}