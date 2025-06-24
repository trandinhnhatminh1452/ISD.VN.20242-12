package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aims.BookSeller.Entity.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
} 