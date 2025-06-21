package vn.aims.BookSeller.Repository;

import vn.aims.BookSeller.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}