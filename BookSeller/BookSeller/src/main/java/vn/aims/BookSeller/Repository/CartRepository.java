package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
