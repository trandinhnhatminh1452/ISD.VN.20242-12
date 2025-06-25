package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.Cart;
import vn.aims.BookSeller.Entity.CartItem;

import java.util.List;

public interface CartItemJpaRepo extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCart(Cart cart);
    CartItem findByCartAndProduct_ProductId(Cart cart, Integer productId);
}
